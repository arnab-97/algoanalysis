import { useDispatch, useSelector } from "react-redux";
import { updateProblemStatus } from "/redux/reducers/sdeSheetSlice";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProblemList() {
  const dispatch = useDispatch();
  const problems = useSelector((state) => state.sdeSheet.filteredProblems);
  const [isClient, setIsClient] = useState(false);
  const [expandedProblems, setExpandedProblems] = useState(new Set());

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleExpanded = (problemId) => {
    const newExpanded = new Set(expandedProblems);
    if (newExpanded.has(problemId)) {
      newExpanded.delete(problemId);
    } else {
      newExpanded.add(problemId);
    }
    setExpandedProblems(newExpanded);
  };

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
      case "easy": return { text: "text-green", bg: "bg-green", bgLight: "bg-green-bg" };
      case "medium": return { text: "text-yellow", bg: "bg-yellow", bgLight: "bg-yellow-bg" };
      case "hard": return { text: "text-red", bg: "bg-red", bgLight: "bg-red-bg" };
      default: return { text: "text-text-1", bg: "bg-text-1", bgLight: "bg-bg-3" };
    }
  };

  const getDifficultyBadge = (difficulty) => {
    const colors = getDifficultyColor(difficulty);
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-space ${colors.text} ${colors.bgLight} border border-opacity-30 ${colors.bg.replace('bg-', 'border-')}`}>
        {difficulty}
      </span>
    );
  };

  if (!isClient) {
    return (
      <div className="border-[1px] border-border-1 rounded-lg p-8 text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-bg-3 rounded w-1/4 mx-auto mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-bg-3 rounded"></div>
            <div className="h-3 bg-bg-3 rounded w-5/6"></div>
            <div className="h-3 bg-bg-3 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {problems.map((problem) => (
        <motion.div 
          key={problem.id}
          className="bg-bg-2 border-2 border-border-1 rounded-xl p-6 hover:bg-bg-3 hover:border-green hover:border-opacity-50 transition-all duration-300 hover:shadow-lg hover:shadow-green hover:shadow-opacity-10"
          whileHover={{ y: -2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col gap-4">
            {/* Main problem info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-text-1 font-space text-lg font-medium hover:text-cyan transition-colors duration-200">
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
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center justify-center w-6 h-6 bg-green rounded-full"
                    >
                      <svg className="w-4 h-4 text-bg-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </motion.div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleExpanded(problem.id)}
                    className="p-2 text-text-1 hover:text-cyan hover:bg-bg-3 rounded-lg transition-all duration-200"
                    title={expandedProblems.has(problem.id) ? "Show less" : "Show more"}
                  >
                    <motion.svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ rotate: expandedProblems.has(problem.id) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  
                  <motion.button
                    onClick={() => toggleStatus(problem.id, problem.status)}
                    className={`px-6 py-2 rounded-lg font-space text-sm font-medium transition-all duration-200 ${
                      problem.status === "Solved" 
                        ? "bg-green-bg text-green hover:bg-green hover:text-bg-1 border-2 border-green" 
                        : "bg-red-bg text-red hover:bg-red hover:text-bg-1 border-2 border-red"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {problem.status}
                  </motion.button>
                </div>
              </div>
              
              {/* Tags section */}
              <div className="flex flex-wrap gap-3 mb-4">
                {getDifficultyBadge(problem.difficulty)}
                
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-space text-purple bg-purple-bg border border-purple border-opacity-30">
                  {problem.category}
                </span>
                
                <div className="flex flex-wrap gap-2">
                  {problem.companies.slice(0, 3).map((company, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-space text-text-1 bg-bg-3 border border-border-1">
                      {company}
                    </span>
                  ))}
                  {problem.companies.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-space text-cyan bg-cyan-bg border border-cyan border-opacity-30">
                      +{problem.companies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Expandable details */}
            <AnimatePresence>
              {expandedProblems.has(problem.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-border-1 pt-4 space-y-4"
                >
                  {/* Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {problem.attempts > 0 && (
                      <div className="bg-bg-3 rounded-lg p-3 border border-border-1">
                        <div className="text-xs text-text-1 opacity-75 mb-1">Attempts</div>
                        <div className="text-lg font-space text-cyan">{problem.attempts}</div>
                      </div>
                    )}
                    {problem.lastAttempted && (
                      <div className="bg-bg-3 rounded-lg p-3 border border-border-1">
                        <div className="text-xs text-text-1 opacity-75 mb-1">Last Attempted</div>
                        <div className="text-sm font-space text-text-1">{formatDate(problem.lastAttempted)}</div>
                      </div>
                    )}
                    {problem.completedAt && (
                      <div className="bg-bg-3 rounded-lg p-3 border border-border-1">
                        <div className="text-xs text-text-1 opacity-75 mb-1">Completed</div>
                        <div className="text-sm font-space text-green">{formatDate(problem.completedAt)}</div>
                      </div>
                    )}
                  </div>

                  {/* All companies */}
                  {problem.companies.length > 3 && (
                    <div>
                      <div className="text-sm text-text-1 opacity-75 mb-2">All Companies</div>
                      <div className="flex flex-wrap gap-2">
                        {problem.companies.map((company, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-space text-text-1 bg-bg-3 border border-border-1">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {problem.notes && (
                    <div className="bg-bg-3 rounded-lg p-4 border border-border-1">
                      <div className="text-sm text-text-1 opacity-75 mb-2">Notes</div>
                      <div className="text-sm text-text-1 italic leading-relaxed">
                        {problem.notes}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
      
      {problems.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-bg-2 rounded-xl border-2 border-border-1"
        >
          <div className="text-text-1 opacity-60 font-space text-lg mb-2">No problems found</div>
          <div className="text-text-1 opacity-40 font-space text-sm">Try adjusting your filters</div>
        </motion.div>
      )}
    </div>
  );
}
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