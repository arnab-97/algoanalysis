import { useState } from 'react';

export default function RoadmapTopic({ topic, levelColor }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className={`border border-${levelColor} rounded-lg overflow-hidden`}>
      <div className={`p-4 bg-bg-3 flex items-center justify-between`}>
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={() => setIsCompleted(!isCompleted)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
              isCompleted 
                ? `bg-${levelColor} border-${levelColor}` 
                : 'border-text-1'
            }`}
          >
            {isCompleted && (
              <svg className="w-4 h-4 text-bg-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <div className="flex-1">
            <h3 className="text-text-1 font-space text-lg">{topic.title}</h3>
            <p className="text-text-1 opacity-75 text-sm">{topic.description}</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-4 text-text-1 hover:text-cyan transition-colors duration-200"
        >
          <svg
            className={`w-6 h-6 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="p-4 bg-bg-2 space-y-4">
          {/* Learning Objectives */}
          <div>
            <h4 className="text-cyan font-space mb-2">Learning Objectives</h4>
            <ul className="list-disc list-inside text-text-1 space-y-1">
              {topic.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-purple font-space mb-2">Resources</h4>
            <ul className="space-y-2">
              {topic.resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-1 hover:text-cyan transition-colors duration-200 flex items-center gap-2"
                  >
                    {resource.title}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice */}
          <div>
            <h4 className="text-green font-space mb-2">Practice</h4>
            <ul className="list-disc list-inside text-text-1 space-y-1">
              {topic.practice.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Assessment Criteria */}
          <div>
            <h4 className="text-red font-space mb-2">Assessment Criteria</h4>
            <ul className="list-disc list-inside text-text-1 space-y-1">
              {topic.assessment.map((criterion, index) => (
                <li key={index}>{criterion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}