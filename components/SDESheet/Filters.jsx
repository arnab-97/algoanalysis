import { useDispatch, useSelector } from "react-redux";
import { setFilters, sortProblems } from "/redux/reducers/sdeSheetSlice";

export default function SDEFilters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.sdeSheet.filters);

  const handleFilterChange = (type, value) => {
    dispatch(setFilters({ [type]: value }));
  };

  const handleSort = (value) => {
    dispatch(sortProblems(value));
  };

  return (
    <div className="flex flex-col md:flex-row gap-gap mb-gap">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search problems..."
          className="w-full p-2 bg-bg-2 border-[1px] border-border-1 text-text-1 font-space focus:border-cyan focus:outline-none transition-colors duration-200"
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </div>
      
      <select 
        className="p-2 bg-bg-2 border-[1px] border-border-1 text-text-1 font-space focus:border-cyan focus:outline-none transition-colors duration-200"
        value={filters.difficulty}
        onChange={(e) => handleFilterChange("difficulty", e.target.value)}
      >
        <option value="all">All Difficulties</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <select
        className="p-2 bg-bg-2 border-[1px] border-border-1 text-text-1 font-space focus:border-cyan focus:outline-none transition-colors duration-200"
        value={filters.category}
        onChange={(e) => handleFilterChange("category", e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="Arrays">Arrays</option>
        <option value="Strings">Strings</option>
        <option value="Linked Lists">Linked Lists</option>
        <option value="Stacks">Stacks</option>
        <option value="Trees">Trees</option>
      </select>

      <select
        className="p-2 bg-bg-2 border-[1px] border-border-1 text-text-1 font-space focus:border-cyan focus:outline-none transition-colors duration-200"
        value={filters.status}
        onChange={(e) => handleFilterChange("status", e.target.value)}
      >
        <option value="all">All Status</option>
        <option value="solved">Solved</option>
        <option value="unsolved">Unsolved</option>
      </select>

      <select
        className="p-2 bg-bg-2 border-[1px] border-border-1 text-text-1 font-space focus:border-cyan focus:outline-none transition-colors duration-200"
        value={filters.sortBy}
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value="default">Sort By</option>
        <option value="difficulty">Difficulty</option>
        <option value="recent">Recent</option>
        <option value="attempts">Attempts</option>
      </select>
    </div>
  );
}