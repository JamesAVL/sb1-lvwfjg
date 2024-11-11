import React from 'react';

const tips = [
  'Place food in an open container on the wire rack',
  'Start with shortest time and extend if needed',
  'Turn/stir food halfway through defrosting',
  'For poultry, cover delicate parts with foil',
  'Let food stand for 5-10 minutes after defrosting',
  'Check food temperature before cooking'
];

export function DefrostTips() {
  return (
    <div className="mt-6 bg-white p-4 rounded-lg">
      <h2 className="font-bold mb-2">Tips:</h2>
      <ul className="text-sm text-gray-600 space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2">•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}