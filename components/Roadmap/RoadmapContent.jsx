import { useState } from 'react';
import RoadmapLevel from './RoadmapLevel';
import roadmapData from '/public/data/roadmapData.json';

export default function RoadmapContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  
  return (
    <div className="p-gap">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-unica text-text-1 mb-4">
          Software Development Engineer Roadmap
        </h1>
        <p className="text-text-1 font-space">
          A comprehensive guide to becoming a proficient Software Development Engineer
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search topics..."
          className="flex-1 p-3 bg-bg-2 border-2 border-border-1 text-text-1 font-space rounded-lg focus:border-cyan focus:outline-none transition-colors duration-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-3 bg-bg-2 border-2 border-border-1 text-text-1 font-space rounded-lg focus:border-cyan focus:outline-none transition-colors duration-200"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Roadmap Levels */}
      <div className="space-y-8">
        {roadmapData.levels
          .filter(level => selectedLevel === 'all' || level.id === selectedLevel)
          .map(level => (
            <RoadmapLevel
              key={level.id}
              level={level}
              searchQuery={searchQuery}
            />
          ))}
      </div>
    </div>
  );
}