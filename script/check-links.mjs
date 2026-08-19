import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const ignoredDirectories = new Set([".git", "node_modules", "dist", "build"]);
const htmlFiles = [];

async function collectHtmlFiles(directory) {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
        if (entry.isDirectory() && ignoredDirectories.has(entry.name)) {
            continue;
        }

        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            await collectHtmlFiles(fullPath);
        } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
            htmlFiles.push(fullPath);
        }
    }
}

async function checkExactPath(targetPath) {
    const relativePath = path.relative(projectRoot, targetPath);

    if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
        return { type: "outside" };
    }

    const segments = relativePath.split(path.sep).filter(Boolean);
    let currentPath = projectRoot;

    for (const segment of segments) {
        let entries;

        try {
            entries = await readdir(currentPath);
        } catch {
            return { type: "missing" };
        }

        if (entries.includes(segment)) {
            currentPath = path.join(currentPath, segment);
            continue;
        }

        const caseMatch = entries.find((entry) => entry.toLowerCase() === segment.toLowerCase());

        if (caseMatch) {
            return { type: "case", expected: caseMatch };
        }

        return { type: "missing" };
    }

    try {
        await stat(currentPath);
        return { type: "ok" };
    } catch {
        return { type: "missing" };
    }
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isExternal(value) {
    return /^(?:https?:|mailto:|tel:|data:|blob:|javascript:|\/\/)/i.test(value);
}

await collectHtmlFiles(projectRoot);

const issues = [];
let checkedReferences = 0;
let placeholderLinks = 0;

for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, "utf8");
    const relativeHtmlFile = path.relative(projectRoot, htmlFile);
    const attributePattern = /\b(href|src)\s*=\s*(["'])(.*?)\2/gi;
    let match;

    while ((match = attributePattern.exec(html)) !== null) {
        const attribute = match[1].toLowerCase();
        const rawValue = match[3].trim();

        if (!rawValue || isExternal(rawValue)) {
            continue;
        }

        if (rawValue === "#") {
            placeholderLinks += 1;
            issues.push(`${relativeHtmlFile}: placeholder href="#"`);
            continue;
        }

        const hashIndex = rawValue.indexOf("#");
        const fragment = hashIndex >= 0 ? decodeURIComponent(rawValue.slice(hashIndex + 1)) : "";
        const withoutHash = hashIndex >= 0 ? rawValue.slice(0, hashIndex) : rawValue;
        const pathValue = withoutHash.split("?")[0];
        const decodedPath = decodeURIComponent(pathValue);
        const targetPath = decodedPath
            ? (decodedPath.startsWith("/")
                ? path.resolve(projectRoot, `.${decodedPath}`)
                : path.resolve(path.dirname(htmlFile), decodedPath))
            : htmlFile;

        checkedReferences += 1;

        const pathStatus = await checkExactPath(targetPath);

        if (pathStatus.type !== "ok") {
            issues.push(`${relativeHtmlFile}: ${attribute}="${rawValue}" (${pathStatus.type})`);
            continue;
        }

        if (attribute === "href" && fragment && targetPath.toLowerCase().endsWith(".html")) {
            const targetHtml = await readFile(targetPath, "utf8");
            const fragmentPattern = new RegExp(`\\b(?:id|name)=["']${escapeRegExp(fragment)}["']`, "i");

            if (!fragmentPattern.test(targetHtml)) {
                issues.push(`${relativeHtmlFile}: href="${rawValue}" (missing fragment #${fragment})`);
            }
        }
    }
}

const sourceFiles = [];

async function collectSourceFiles(directory) {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
        if (entry.isDirectory() && ignoredDirectories.has(entry.name)) {
            continue;
        }

        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            await collectSourceFiles(fullPath);
        } else if (entry.isFile() && /\.(?:html|js)$/i.test(entry.name)) {
            sourceFiles.push(fullPath);
        }
    }
}

await collectSourceFiles(projectRoot);

for (const sourceFile of sourceFiles) {
    const source = await readFile(sourceFile, "utf8");

    if (source.includes("Index.html")) {
        issues.push(`${path.relative(projectRoot, sourceFile)}: contains case-sensitive path Index.html`);
    }
}

if (issues.length > 0) {
    console.error(`Link check failed with ${issues.length} issue(s):`);
    issues.forEach((issue) => console.error(`- ${issue}`));
    process.exitCode = 1;
} else {
    console.log(`Link check passed: ${htmlFiles.length} HTML files, ${checkedReferences} local references, ${placeholderLinks} placeholders.`);
}
