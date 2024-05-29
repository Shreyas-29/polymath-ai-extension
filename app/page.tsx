import Popup from "@/components/Popup";

export default function Urls() {
  // const [urls, setUrls] = useState([]);

  // useEffect(() => {
  //   const fetchUrls = async () => {
  //     const urlsCollection = collection(db, 'urls');
  //     const urlSnapshot = await getDocs(urlsCollection);
  //     const urlList = urlSnapshot.docs.map(doc => doc.data().url);
  //     setUrls(urlList as never[]);
  //   };

  //   fetchUrls();
  // }, []);

  // console.log("urls", urls);

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <Popup />
    </div>
  );
}
