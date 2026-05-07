// Projects data used in the ProjectsSection component

const projectsData = [
  {
    id: 1,
    title: "Payback App",
    description: "Mobile payment & reward program",
    image: "/images/projects/1.png",
    previewUrl: "https://www.payback.de/app",
    tag: ["mobile", "featured"]
  },
  {
    id: 2,
    title: "BVB FC",
    description: "Borussia Dortmund official mobile app",
    image: "/images/projects/2.png",
    previewUrl: "https://play.google.com/store/apps/details?id=de.bvb09.android&hl=en",
    tag: ["mobile", "featured"]
  },
  {
    id: 3,
    title: "Westham FC",
    description: "Westham official mobile app",
    image: "/images/projects/3.png",
    previewUrl: "https://play.google.com/store/apps/details?id=de.elasticbrains.west_ham_united&hl=en_GB&gl=US",
    tag: ["mobile"]
  },
  {
    id: 4,
    title: "Navvis Ivion Go",
    description: "Indoor Mapping",
    image: "/images/projects/4.png",
    previewUrl: "https://play.google.com/store/apps/details?id=com.navvis.mdfa&hl=en&gl=US",
    tag: ["mobile"]
  },
  {
    id: 5,
    title: "Bde Bank",
    description: "Mobile banking app",
    image: "/images/projects/5.png",
    previewUrl: "http://www.bdecash.com/",
    tag: ["mobile", "banking"]
  },
  {
    id: 6,
    title: "BLC Bank",
    description: "Mobile payment app",
    image: "/images/projects/6.png",
    previewUrl: "https://www.blcbank.com/personal/detail.aspx?pid=164&ptid=1",
    tag: ["mobile", "banking"]
  },
  {
    id: 7,
    title: "Elnashra",
    description: "Mobile news app",
    image: "/images/projects/7.png",
    previewUrl: "https://play.google.com/store/apps/details?id=com.elnashra&hl=en&gl=US",
    tag: ["mobile"]
  },
  {
    id: 8,
    title: "Hey Pay",
    description: "Mobile payment app",
    image: "/images/projects/8.png",
    previewUrl: "http://hey-pay.me/#aboutUsId",
    tag: ["mobile", "banking"]
  },
  {
    id: 9,
    title: "NBK Bank",
    description: "Mobile banking app",
    image: "/images/projects/9.png",
    previewUrl: "https://play.google.com/store/apps/details?id=com.nbk.IBGmobile&hl=en_US",
    tag: ["mobile", "banking"]
  },
];

// Available filter categories
export const filterOptions = [
  { name: "All", value: "all" },
  { name: "Featured", value: "featured" },
  { name: "Mobile", value: "mobile" },
  { name: "Banking", value: "banking" },
];

export default projectsData;