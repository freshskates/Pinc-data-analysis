import { useState, useEffect, useRef } from "react";
import { StackedBar } from "./charts/StackedBar";
import ClassInfo from "./ClassInfo";
import axios from "axios";
import { saveAs } from "file-saver";
import "./statspanel.css";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setPincData, selectData, selectDataExists } from "../../store/slices/dataSlice";

function StatsPanel({ selected_demographic }: any) {
  const currentGraph = useRef(null);

  const [selectedCourses, setSelectedCourses] = useState(["CSC220", "CSC219"]);

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  const saveCanvas = () => {
    //save to png
    // const canvasSave = currentGraph.
    if (!currentGraph == null) {
      return;
    }

    // const base64Image = currentGraph.current.toBase64Image();

    // canvasSave.toBlob((blob: any) => {
    //   saveAs(blob, "testing.png");
    // });
  };

  const getData = async () => {
    try {
      let response = await axios.get("http://localhost:3001/stats/read", {
        headers: {
          "x-access-token": cookies.user,
        },
      });

      let status: any = response.data;
      if (status.success) {
        dispatch(setPincData(status.data));
        console.log(status.data);
      } else {
      }
    } catch (err) {}
  };
  useEffect(() => {
    getData();
  });
  return (
    <div className="statspanel_container">
      <div className="stats_info">
        <ClassInfo
          courses={["CSC220", "CSC219"]}
          select_cb={setSelectedCourses}
          class_name="CSC 220 | 219"
          image_src="asd"
        />
        <ClassInfo
          courses={["CSC210", "CSC306"]}
          select_cb={setSelectedCourses}
          class_name="CSC 210 | 306"
          image_src="asd"
        />
        <ClassInfo
          courses={["CSC307", "CSC308"]}
          select_cb={setSelectedCourses}
          class_name="CSC 307 | 308"
          image_src="asd"
        />
        <ClassInfo
          courses={["CSC699", "CSC698"]}
          select_cb={setSelectedCourses}
          class_name="CSC 698 | 699"
          image_src="asd"
        />
      </div>

      <div className="stats_data_vis">
        <div className="stats_download_zone">
          <p className="stats_download_desc">
            Download data visualization for {selectedCourses.join(" and ")}
          </p>
          <button className="download_button" onClick={() => saveCanvas()}>
            Download
          </button>
        </div>
        <div className="stats_display">
          <StackedBar
            ref_cb={currentGraph}
            courses={selectedCourses}
            demographic={selected_demographic}
          />
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;
