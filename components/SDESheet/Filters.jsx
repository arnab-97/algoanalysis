import { useDispatch, useSelector } from "react-redux";
import { setFilters, sortProblems } from "/redux/reducers/sdeSheetSlice";
import { motion } from "framer-motion";

export default function SDEFilters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.sdeSheet.filters);

  const handleFilterChange = (type, value) => {
    dispatch(setFilters({ [type]: value }));
  };

  const handleSort = (value) => {
    dispatch(sortProblems(value));
  };

  const clearAllFilters = () => {
    dispatch(setFilters({
      search: "",
      difficulty: "all",
      category: "all",
      status: "all",
      sortBy: "default"
    }));
  };

  const hasActiveFilters = filters.search || 
    filters.difficulty !== "all" || 
    filters.category !== "all" || 
    filters.status !== "all" || 
    filters.sortBy !== "default";
  return (
    <div className="bg-bg-2 border-2 border-border-1 rounded-xl p-6 mb-gap">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-text-1 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search problems..."
            className="w-full pl-10 pr-4 py-3 bg-bg-3 border-2 border-border-1 text-text-1 font-space rounded-lg focus:border-cyan focus:outline-none transition-all duration-200 hover:border-green hover:border-opacity-50"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>
        
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <select 
            className="px-4 py-3 bg-bg-3 border-2 border-border-1 text-text-1 font-space rounded-lg focus:border-cyan focus:outline-none transition-all duration-200 hover:border-green hover:border-opacity-50 min-w-[140px]"
            value={filters.difficulty}
            onChange={(e) => handleFilterChange("difficulty", e.target.value)}
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>



          <select
            className="px-4 py-3 bg-bg-3 border-2 border-border-1 text-text-1 font-space rounded-lg focus:border-cyan focus:outline-none transition-all duration-200 hover:border-green hover:border-opacity-50 min-w-[140px]"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Arrays">Arrays</option>
            <option value="Strings">Strings</option>
            <option value="Linked Lists">Linked Lists</option>
            <option value="Stacks">Stacks</option>
            <option value="Trees">Trees</option>
            <option value="Hash Table">Hash Table</option>
            <option value="Dynamic Programming">Dynamic Programming</option>
            <option value="Graphs">Graphs</option>
            <option value="Backtracking">Backtracking</option>
            <option value="Binary Search">Binary Search</option>
            <option value="Heaps">Heaps</option>
            <option value="Design">Design</option>
            <option value="Greedy">Greedy</option>
            <option value="Math">Math</option>
            <option value="Sliding Window">Sliding Window</option>
          <select
            className="px-4 py-3 bg-bg-3 border-2 border-border-1 text-text-1 font-space rounded-lg focus:border-cyan focus:outline-none transition-all duration-200 hover:border-green hover:border-opacity-50 min-w-[120px]"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>
            <option value="Trie">Trie</option>
          <select
            className="px-4 py-3 bg-bg-3 border-2 border-border-1 text-text-1 font-space rounded-lg focus:border-cyan focus:outline-none transition-all duration-200 hover:border-green hover:border-opacity-50 min-w-[120px]"
            value={filters.sortBy}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="difficulty">Difficulty</option>
            <option value="recent">Recent</option>
            <option value="attempts">Attempts</option>
          </select>
          </select>
          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearAllFilters}
              className="px-4 py-3 bg-red-bg text-red border-2 border-red rounded-lg font-space text-sm font-medium hover:bg-red hover:text-bg-1 transition-all duration-200 flex items-center gap-2 min-w-[100px] justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </motion.button>
          )}
        </div>
      </div>
      
      {/* Active filters indicator */}
      {hasActiveFilters && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 pt-4 border-t border-border-1"
        >
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-text-1 opacity-75 font-space">Active filters:</span>
            {filters.search && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-space text-cyan bg-cyan-bg border border-cyan border-opacity-30">
                Search: "{filters.search}"
              </span>
            )}
            {filters.difficulty !== "all" && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-space text-green bg-green-bg border border-green border-opacity-30">
                {filters.difficulty}
              </span>
            )}
            {filters.category !== "all" && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-space text-purple bg-purple-bg border border-purple border-opacity-30">
                {filters.category}
              </span>
            )}
            {filters.status !== "all" && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-space text-blue bg-blue-bg border border-blue border-opacity-30">
                {filters.status}
              </span>
            )}
            {filters.sortBy !== "default" && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-space text-yellow bg-yellow-bg border border-yellow border-opacity-30">
                Sorted by {filters.sortBy}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}