(function () {
  "use strict";

  var cdn = "https://d31flwjaqugbgy.cloudfront.net/s3-cloud-bucket-ader-user/pcs/";
  var sizes = ["XS", "S", "M", "L", "XL"];
  var makeProduct = function (id, name, price, color, sku, material, description, imageMode) {
    var folder = cdn + sku + "/" + sku;
    var detailImages = imageMode === "plain"
      ? [folder + "_1.jpg", folder + "_2.jpg", folder + "_3.jpg"]
      : [folder + "_M_1.jpg", folder + "_M_2.jpg", folder + "_M_3.jpg"];
    return {
      id: id,
      name: name,
      price: price,
      color: color,
      sku: sku,
      sizes: sizes.slice(),
      material: material,
      description: description,
      origin: "Made in Korea",
      inStock: true,
      officialUrl: "https://www.adererror.com/kr/shop/" + id,
      images: detailImages.concat([folder + "_Z_1.jpg", folder + "_Z_2.jpg", folder + (imageMode === "plain" ? "_O_1.jpg" : "_M_O_1.jpg")]),
      cardImage: folder + "_Z_1.jpg"
    };
  };

  window.ADER_PRODUCTS = [
    makeProduct("5764", "T-Shirt Product. 100", 180000, "Noir", "BP05FYTS0102BK", "[Main] 면 73% 폴리에스터 27% [Sub] 면 98% 폴리우레탄 2%", "세미 오버사이즈 핏 반팔 티셔츠, 크루넥, 전면 아트워크, 후면 블루 라벨과 시그니처 지그재그 자수.", "plain"),
    makeProduct("5746", "T-Shirt Product. 48", 180000, "Off White", "BP01SSTS0104OW", "[Main] 면 73% 폴리에스터 27% [Sub] 면 98% 폴리우레탄 2%", "세미 오버사이즈 핏 티셔츠. 후면 입체 구조의 볼륨 실루엣과 시즌 레터링 자수, 프린트, 더블 레이어드 라벨."),
    makeProduct("5744", "T-Shirt Product. 48", 180000, "Noir", "BP01SSTS0104BK", "[Main] 면 73% 폴리에스터 27% [Sub] 면 98% 폴리우레탄 2%", "세미 오버사이즈 핏 티셔츠. 후면 입체 구조의 볼륨 실루엣과 시즌 레터링 자수, 프린트, 더블 레이어드 라벨."),
    makeProduct("5690", "Laton Jacket Product. 6", 730000, "Noir", "BP01SSJK0103BK", "[Main] 폴리에스터 100% [Lining] 폴리에스터 55% 레이온 45%", "오버사이즈 핏 자켓. 전면 크로스 턱과 둥근 소매 패널 레이어드 구조, 주름 텍스처 위 디지털 프린트 소재."),
    makeProduct("5687", "Blazer Product. 3", 760000, "Grey", "BP01SSBZ0203GR", "[Main] 모 100% [Lining] 폴리에스터 55% 레이온 45%", "세미 오버사이즈 핏 블레이저. 하프 더블 브레스티드, 전면 플랩 포켓, 후면 크로스 턱과 볼륨 실루엣."),
    makeProduct("5759", "Half Sleeve Shirt Product. 38", 450000, "Pink", "BP01SSSH0204PK", "[Main] 큐프라 60% 면 40% [Sub] 면 100%", "세미 오버사이즈 핏 셔츠. 스프레드 칼라와 두 겹 레이어드 구조, 전면 주름 가공 및 레이저 커팅."),
    makeProduct("5638", "Trousers Product. 56", 480000, "Grey", "BP01SSBT0102GR", "[Main] 모 100%", "릴랙스 핏 슬랙스. 하이 웨이스트, 지퍼와 훅 앤 아이 여밈, 레이어드 턱에 가려진 포켓."),
    makeProduct("5750", "T-Shirt Product. 51", 190000, "Off White", "BP01SSTS0107OW", "[Main] 면 78% 폴리에스터 22% [Sub] 면 98% 폴리우레탄 2%", "세미 오버사이즈 핏 티셔츠. 바인딩 립 크루넥, 겉 다트 주름 장식, 시즌 그래픽 프린트와 자수."),
    makeProduct("5728", "Meadow Hoodie zip-up Product. 21", 420000, "Grey", "BP01SSHD0401GR", "[Main] 면 100%", "세미 오버사이즈 핏 집업 후디. 투웨이 지퍼 여밈, 우드 스트랩 팁, 둥근 히든 포켓과 더블 레이어드 라벨."),
    makeProduct("5739", "T-Shirt Product. 46", 240000, "Off White", "BP01SSTS0101OW", "[Main] 면 100%", "레귤러 핏 티셔츠. V넥의 작은 띠 장식과 곡선 절개, 후면 곡선 턱, 더블 레이어드 라벨."),
    makeProduct("5738", "T-Shirt Product. 46", 240000, "Noir", "BP01SSTS0101BK", "[Main] 면 100%", "레귤러 핏 티셔츠. V넥의 작은 띠 장식과 곡선 절개, 후면 곡선 턱, 더블 레이어드 라벨."),
    makeProduct("5743", "T-Shirt Product. 47", 170000, "Red", "BP01SSTS0103RD", "[Main] 면 78% 폴리에스터 22% [Sub] 면 98% 폴리우레탄 2%", "레귤러 핏 티셔츠. 전면 넥 더블 레이어드 라벨과 후면 ADERERROR 프린트."),
    makeProduct("5742", "T-Shirt Product. 47", 170000, "Noir", "BP01SSTS0103BK", "[Main] 면 78% 폴리에스터 22% [Sub] 면 98% 폴리우레탄 2%", "레귤러 핏 티셔츠. 전면 넥 더블 레이어드 라벨과 후면 ADERERROR 프린트."),
    makeProduct("5745", "T-Shirt Product. 48", 180000, "Grey", "BP01SSTS0104GR", "[Main] 면 73% 폴리에스터 27% [Sub] 면 98% 폴리우레탄 2%", "세미 오버사이즈 핏 티셔츠. 후면 입체 구조의 볼륨 실루엣과 시즌 레터링 자수, 프린트."),
    makeProduct("5787", "T-Shirt Product. 49", 180000, "Off White", "BP01SSTS0105OW", "[Main] 면 78% 폴리에스터 22% [Sub] 면 98% 폴리우레탄 2%", "세미 오버사이즈 핏 티셔츠. 겹쳐진 립 크루넥, 후면 턱 볼륨 실루엣, 시즌 그래픽 텍스처 프린트."),
    makeProduct("5786", "T-Shirt Product. 49", 180000, "Noir", "BP01SSTS0105BK", "[Main] 면 78% 폴리에스터 22% [Sub] 면 98% 폴리우레탄 2%", "세미 오버사이즈 핏 티셔츠. 겹쳐진 립 크루넥, 후면 턱 볼륨 실루엣, 시즌 그래픽 텍스처 프린트."),
    makeProduct("5748", "Lolly T-Shirt Product. 50", 180000, "Off White", "BP01SSTS0106OW", "[Main] 면 78% 폴리에스터 22% [Sub] 면 98% 폴리우레탄 2%", "오버사이즈 핏 티셔츠. 후면 둥근 패턴과 턱 볼륨 실루엣, 시즌 그래픽 프린트와 포인트 자수."),
    makeProduct("5747", "Lolly T-Shirt Product. 50", 180000, "Noir", "BP01SSTS0106BK", "[Main] 면 78% 폴리에스터 22% [Sub] 면 98% 폴리우레탄 2%", "오버사이즈 핏 티셔츠. 후면 둥근 패턴과 턱 볼륨 실루엣, 시즌 그래픽 프린트와 포인트 자수."),
    makeProduct("5749", "T-Shirt Product. 51", 190000, "Noir", "BP01SSTS0107BK", "[Main] 면 78% 폴리에스터 22% [Sub] 면 98% 폴리우레탄 2%", "세미 오버사이즈 핏 티셔츠. 바인딩 립 크루넥, 겉 다트 주름 장식, 시즌 그래픽 프린트와 자수."),
    makeProduct("5752", "T-Shirt Product. 53", 170000, "Off White", "BP01SSTS0109OW", "[Main] 면 78% 폴리에스터 22% [Sub] 면 98% 폴리우레탄 2%", "세미 오버사이즈 핏 티셔츠. 크루넥, 전면 시즌 그래픽 프린트와 더블 레이어드 라벨."),
    makeProduct("5753", "T-Shirt Product. 53", 170000, "Red", "BP01SSTS0109RD", "[Main] 면 78% 폴리에스터 22% [Sub] 면 98% 폴리우레탄 2%", "세미 오버사이즈 핏 티셔츠. 크루넥, 전면 시즌 그래픽 프린트와 더블 레이어드 라벨."),
    makeProduct("5751", "T-Shirt Product. 53", 170000, "Noir", "BP01SSTS0109BK", "[Main] 면 78% 폴리에스터 22% [Sub] 면 98% 폴리우레탄 2%", "세미 오버사이즈 핏 티셔츠. 크루넥, 전면 시즌 그래픽 프린트와 더블 레이어드 라벨."),
    makeProduct("5794", "T-Shirt Product. 54", 180000, "Off White", "BP01SSTS0111OW", "[Main] 면 78% 폴리에스터 22% [Sub] 면 98% 폴리우레탄 2%", "세미 오버사이즈 핏 티셔츠. 앞으로 넘어오는 절개 라인과 전면 시즌 그래픽 프린트."),
    makeProduct("5761", "Sleeveless Product. 39", 130000, "Off White", "BP01SSSL0101OW", "[Main] 면 100%", "레귤러 핏 슬리브리스. 바인딩 립 스퀘어 넥과 전면 더블 레이어드 라벨, 후면 ADERERROR 프린트.")
  ];
})();
