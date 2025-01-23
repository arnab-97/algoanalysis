import { useState } from 'react';
import RoadmapTopic from './RoadmapTopic';

export default function RoadmapLevel({ level, searchQuery }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const filteredTopics = level.topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLevelColor = (levelId) => {
    switch (levelId) {
      case 'beginner': return 'green';
      case 'intermediate': return 'cyan';
      case 'advanced': return 'purple';
      default: return 'text-1';
    }
  };

  const color = getLevelColor(level.id);

  return (
    <div className={`border-2 border-${color} rounded-lg overflow-hidden`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full p-4 bg-${color}-bg flex justify-between items-center text-text-1 hover:bg-${color} hover:text-bg-1 transition-colors duration-200`}
      >
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-unica">{level.title}</h2>
          <span className="text-sm font-space bg-bg-1 text-text-1 px-3 py-1 rounded-full">
            {level.estimatedTime}
          </span>
        </div>
        <svg
          className={`w-6 h-6 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="p-4 bg-bg-2">
          <div className="mb-4">
            <h3 className="text-green font-space mb-2">Prerequisites</h3>
            <ul className="list-disc list-inside text-text-1 font-space">
              {level.prerequisites.map((prereq, index) => (
                <li key={index}>{prereq}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {filteredTopics.map((topic, index) => (
              <RoadmapTopic
                key={index}
                topic={topic}
                levelColor={color}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}