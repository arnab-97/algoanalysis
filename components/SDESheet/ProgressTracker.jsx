import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    return (
      <div className="mb-gap bg-bg-2 border-2 border-border-1 rounded-xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-bg-3 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-bg-3 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-gap">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-bg-2 border-2 border-border-1 rounded-xl p-6"
      >
        <div className="mb-6">
          <h2 className="text-xl font-space text-text-1 mb-2">Progress Overview</h2>
          <p className="text-text-1 opacity-75 text-sm">Track your coding journey and achievements</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Overall Progress */}
          <motion.div 
            className="text-center bg-bg-3 rounded-xl p-6 border-2 border-border-1 hover:border-green hover:border-opacity-50 transition-all duration-300"
            whileHover={{ y: -4 }}
          >
            <div className="relative mb-2">
              <svg className="w-24 h-24 mx-auto transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#1d261d"
                  strokeWidth="3"
                />
                <motion.path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#1efe5b"
                  strokeWidth="3"
                  strokeDasharray="100"
                  strokeDashoffset={100 - completionPercentage}
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 100 - completionPercentage }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                  className="text-2xl font-bold text-green font-space"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {completionPercentage}%
                </motion.span>
              </div>
            </div>
            <div className="text-text-1 text-sm font-space">
              <div className="font-medium">Total Progress</div>
              <div className="text-cyan text-lg font-bold">{stats.totalSolved}/{totalProblems}</div>
            </div>
          </motion.div>

          {/* Easy Problems */}
          <motion.div 
            className="text-center bg-bg-3 rounded-xl p-6 border-2 border-border-1 hover:border-green hover:border-opacity-50 transition-all duration-300"
            whileHover={{ y: -4 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-green-bg rounded-full flex items-center justify-center border-2 border-green">
              <svg className="w-8 h-8 text-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <motion.div 
              className="text-3xl font-space text-green mb-2 font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              {stats.easy}
            </motion.div>
            <div className="text-text-1 text-sm font-space mb-3">
              Easy Problems
            </div>
            <div className="h-2 bg-bg-1 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-green rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(stats.easy / problems.filter(p => p.difficulty === "Easy").length) * 100}%` }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </div>
          </motion.div>

          {/* Medium Problems */}
          <motion.div 
            className="text-center bg-bg-3 rounded-xl p-6 border-2 border-border-1 hover:border-yellow hover:border-opacity-50 transition-all duration-300"
            whileHover={{ y: -4 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-bg rounded-full flex items-center justify-center border-2 border-yellow">
              <svg className="w-8 h-8 text-yellow" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <motion.div 
              className="text-3xl font-space text-yellow mb-2 font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              {stats.medium}
            </motion.div>
            <div className="text-text-1 text-sm font-space mb-3">
              Medium Problems
            </div>
            <div className="h-2 bg-bg-1 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-yellow rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(stats.medium / problems.filter(p => p.difficulty === "Medium").length) * 100}%` }}
                transition={{ delay: 0.6, duration: 1 }}
              />
            </div>
          </motion.div>

          {/* Hard Problems */}
          <motion.div 
            className="text-center bg-bg-3 rounded-xl p-6 border-2 border-border-1 hover:border-red hover:border-opacity-50 transition-all duration-300"
            whileHover={{ y: -4 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-red-bg rounded-full flex items-center justify-center border-2 border-red">
              <svg className="w-8 h-8 text-red" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <motion.div 
              className="text-3xl font-space text-red mb-2 font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              {stats.hard}
            </motion.div>
            <div className="text-text-1 text-sm font-space mb-3">
              Hard Problems
            </div>
            <div className="h-2 bg-bg-1 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-red rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(stats.hard / problems.filter(p => p.difficulty === "Hard").length) * 100}%` }}
                transition={{ delay: 0.7, duration: 1 }}
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Topic Progress */}
          <motion.div 
            className="bg-bg-3 border-2 border-border-1 rounded-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-purple" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div className="text-text-1 font-space text-lg font-medium">Topic Progress</div>
            </div>
            {Object.entries(stats.topicProgress || {}).map(([topic, progress]) => (
              <motion.div 
                key={topic} 
                className="mb-4 last:mb-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + Object.keys(stats.topicProgress || {}).indexOf(topic) * 0.1 }}
              >
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-1 font-space font-medium">{topic}</span>
                  <span className="text-cyan font-space font-bold">{progress.solved}/{progress.total}</span>
                </div>
                <div className="h-2 bg-bg-1 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-green to-cyan rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(progress.solved / progress.total) * 100}%` }}
                    transition={{ delay: 1 + Object.keys(stats.topicProgress || {}).indexOf(topic) * 0.1, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Streak and Stats */}
          <motion.div 
            className="bg-bg-3 border-2 border-border-1 rounded-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <svg className="w-6 h-6 text-red" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                  </svg>
                </motion.div>
                <div className="text-text-1 font-space font-medium">Current Streak</div>
              </div>
              <motion.div 
                className="text-3xl text-red font-space font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
              >
                {stats.streak} days
              </motion.div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 px-3 bg-bg-1 rounded-lg">
                <span className="text-text-1 font-space text-sm">Last solved:</span>
                <span className="text-cyan font-space text-sm font-medium">
                  {stats.lastSolved ? new Date(stats.lastSolved).toLocaleDateString() : 'Never'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-bg-1 rounded-lg">
                <span className="text-text-1 font-space text-sm">Success rate:</span>
                <span className="text-green font-space text-sm font-bold">
                  {totalProblems > 0 ? Math.round((stats.totalSolved / totalProblems) * 100) : 0}%
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}