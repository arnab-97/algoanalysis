import { useDispatch, useSelector } from "react-redux";
import { updateProblemStatus } from "/redux/reducers/sdeSheetSlice";
import { useEffect, useState } from "react";


export default function ProblemList() {
  const dispatch = useDispatch();
  const problems = useSelector((state) => state.sdeSheet.filteredProblems);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "Solved" ? "Unsolved" : "Solved";
    dispatch(updateProblemStatus({ id, status: newStatus }));
  };

  const formatDate = (dateString) => {
    if (!dateString || !isClient) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "text-green";
      case "medium": return "text-yellow";
      case "hard": return "text-red";
      default: return "text-text-1";
    }
  };

  if (!isClient) {
    return <div className="border-[1px] border-border-1">Loading...</div>;
  }

  return (
    <div className="border-[1px] border-border-1">
      {problems.map((problem) => (
        <div 
          key={problem.id}
          className="p-4 border-b-[1px] border-border-1 bg-bg-2 hover:bg-bg-3 transition-colors duration-200"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h3 className="text-text-1 font-space text-base md:text-lg">
                  <a 
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan transition-colors duration-200"
                  >
                    {problem.title}
                  </a>
                </h3>
                {problem.status === "Solved" && (
                  <span className="text-green">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`px-2 py-1 text-xs md:text-sm rounded font-space ${getDifficultyColor(problem.difficulty)} bg-opacity-20 bg-${problem.difficulty.toLowerCase()}-bg`}>
                  {problem.difficulty}
                </span>
                <span className="px-2 py-1 text-xs md:text-sm rounded font-space text-purple bg-purple-bg bg-opacity-20">
                  {problem.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {problem.companies.map((company, index) => (
                    <span key={index} className="px-2 py-1 text-xs md:text-sm rounded font-space text-text-1 bg-bg-3">
                      {company}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs md:text-sm text-text-1">
                {problem.attempts > 0 && (
                  <span>Attempts: {problem.attempts}</span>
                )}
                {problem.lastAttempted && (
                  <span>Last attempted: {formatDate(problem.lastAttempted)}</span>
                )}
                {problem.completedAt && (
                  <span>Completed: {formatDate(problem.completedAt)}</span>
                )}
              </div>

              {problem.notes && (
                <div className="mt-2 text-text-1 text-xs md:text-sm italic">
                  {problem.notes}
                </div>
              )}
            </div>

            <button
              onClick={() => toggleStatus(problem.id, problem.status)}
              className={`w-full md:w-auto px-4 py-2 rounded font-space text-sm md:text-base transition-all duration-200 ${
                problem.status === "Solved" 
                  ? "bg-green-bg text-green hover:bg-green hover:text-bg-1" 
                  : "bg-red-bg text-red hover:bg-red hover:text-bg-1"
              }`}
            >
              {problem.status}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}