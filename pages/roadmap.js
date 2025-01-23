import { useEffect } from "react";
import { batch, useDispatch } from "react-redux";
import { NextSeo } from "next-seo";

import {
  setAlgoId,
  setAlgoName,
  setAlgoCategory,
} from "/redux/reducers/pageSlice";
import TopBar from "/components/TopBar";
import Footer from "/components/Footer";
import RoadmapContent from "/components/Roadmap/RoadmapContent";

export default function Roadmap() {
  const dispatch = useDispatch();

  useEffect(() => {
    batch(() => {
      dispatch(setAlgoId("roadmap"));
      dispatch(setAlgoName("SDE Roadmap"));
      dispatch(setAlgoCategory("roadmap"));
    });
  }, []);

  return (
    <div>
      <NextSeo
        title="SDE Roadmap | Algo Analysis"
        description="Comprehensive learning roadmap for Software Development Engineers"
        canonical="https://algo-analysis.netlify.app/roadmap"
        openGraph={{
          url: "https://algo-analysis.netlify.app/roadmap",
          title: "SDE Roadmap | Algo Analysis",
          description: "Comprehensive learning roadmap for Software Development Engineers",
        }}
      />
      <div className="px-gap">
        <div className="relative w-full border-[1px] border-border-1 bg-bg-1">
          <TopBar />
          <RoadmapContent />
        </div>
        <Footer />
      </div>
    </div>
  );
}