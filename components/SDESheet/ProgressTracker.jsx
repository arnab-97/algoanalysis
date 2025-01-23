import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ProgressTracker() {
  // Add client-side only state
  const [isClient, setIsClient] = useState(false);
  const stats = useSelector((state) => state.sdeSheet.stats);
  const problems = useSelector((state) => state.sdeSheet.problems);
  
  const totalProblems = problems.length;
  const completionPercentage = Math.round((stats.totalSolved / totalProblems) * 100) || 0;

  // Use useEffect to handle client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render progress content on client
  if (!isClient) {
    return <div className="mb-gap">Loading...</div>;
  }

  return (
    <div className="mb-gap">
      <div className="bg-bg-2 border-[1px] border-border-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="relative mb-2">
              <svg className="w-20 h-20 mx-auto" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#1b241b"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#1efe5b"
                  strokeWidth="3"
                  strokeDasharray={`${completionPercentage}, 100`}
                />
                <text
                  x="18"
                  y="20.35"
                  fontSize="10px" 
                  fontWeight="bold" 
                  fill="#f0f0f0"
                  textAnchor="middle"
                >
                  {completionPercentage}%
                </text>
              </svg>
            </div>
            <div className="text-text-1 text-sm">
              Total Progress ({stats.totalSolved}/{totalProblems})
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-space text-green mb-1">
              {stats.easy}
            </div>
            <div className="text-text-1 text-sm">
              Easy Problems
            </div>
            <div className="mt-2 h-1 bg-bg-3 rounded-full">
              <div 
                className="h-full bg-green rounded-full transition-all duration-500"
                style={{ width: `${(stats.easy / problems.filter(p => p.difficulty === "Easy").length) * 100}%` }}
              />
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-space text-yellow mb-1">
              {stats.medium}
            </div>
            <div className="text-text-1 text-sm">
              Medium Problems
            </div>
            <div className="mt-2 h-1 bg-bg-3 rounded-full">
              <div 
                className="h-full bg-yellow rounded-full transition-all duration-500"
                style={{ width: `${(stats.medium / problems.filter(p => p.difficulty === "Medium").length) * 100}%` }}
              />
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-space text-red mb-1">
              {stats.hard}
            </div>
            <div className="text-text-1 text-sm">
              Hard Problems
            </div>
            <div className="mt-2 h-1 bg-bg-3 rounded-full">
              <div 
                className="h-full bg-red rounded-full transition-all duration-500"
                style={{ width: `${(stats.hard / problems.filter(p => p.difficulty === "Hard").length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-[1px] border-border-1 p-4 rounded">
            <div className="text-text-1 font-space mb-4">Topic Progress</div>
            {Object.entries(stats.topicProgress || {}).map(([topic, progress]) => (
              <div key={topic} className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-1">{topic}</span>
                  <span className="text-cyan">{progress.solved}/{progress.total}</span>
                </div>
                <div className="h-1 bg-bg-3 rounded-full">
                  <div 
                    className="h-full bg-green rounded-full transition-all duration-500"
                    style={{ width: `${(progress.solved / progress.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="border-[1px] border-border-1 p-4 rounded">
            <div className="flex items-center justify-between mb-4">
              <div className="text-text-1 font-space">Current Streak</div>
              <div className="text-2xl text-green font-space">
                {stats.streak} days
              </div>
            </div>
            <div className="text-sm text-text-1">
              Last solved: {stats.lastSolved ? new Date(stats.lastSolved).toLocaleDateString() : 'Never'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}