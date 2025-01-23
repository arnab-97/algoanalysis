import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { batch } from "react-redux";
import { NextSeo } from "next-seo";

import {
  setAlgoId,
  setAlgoName,
  setAlgoCategory,
} from "/redux/reducers/pageSlice";
import { setFilters, updateProblemStatus } from "/redux/reducers/sdeSheetSlice";
import TopBar from "/components/TopBar";
import Footer from "/components/Footer";
import SDEFilters from "/components/SDESheet/Filters";
import ProblemList from "/components/SDESheet/ProblemList";
import ProgressTracker from "/components/SDESheet/ProgressTracker";

export default function SDESheet() {
  const dispatch = useDispatch();

  useEffect(() => {
    batch(() => {
      dispatch(setAlgoId("sde-sheet"));
      dispatch(setAlgoName("SDE Sheet"));
      dispatch(setAlgoCategory("sde-sheet"));
    });
  }, []);

  return (
    <div>
      <NextSeo
        title="SDE Sheet | Algo Analysis"
        description="Curated collection of coding problems for SDE preparation"
        canonical="https://algo-analysis.netlify.app/sde-sheet"
        openGraph={{
          url: "https://algo-analysis.netlify.app/sde-sheet",
          title: "SDE Sheet | Algo Analysis",
          description: "Curated collection of coding problems for SDE preparation",
        }}
      />
      <div className="px-gap">
        <div className="relative w-full border-[1px] border-border-1 bg-bg-1">
          <TopBar />
          <div className="p-gap">
            <ProgressTracker />
            <SDEFilters />
            <ProblemList />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}