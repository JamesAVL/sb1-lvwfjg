import React from 'react';
import { Gauge, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ConfidenceIndicatorProps {
  confidence: number;
}

export function ConfidenceIndicator({ confidence }: ConfidenceIndicatorProps) {
  const percentage = Math.max(0, Math.min(100, confidence * 100));
  
  const getConfidenceColor = () => {
    if (confidence > 0.8) return 'text-green-500';
    if (confidence > 0.5) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Gauge className={cn("w-5 h-5", getConfidenceColor())} />
        <p className="text-sm font-medium">Calculation Confidence</p>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={cn(
            'h-2.5 rounded-full transition-all duration-500',
            confidence > 0.8 ? 'bg-green-500' :
            confidence > 0.5 ? 'bg-yellow-500' : 'bg-red-500'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {confidence < 0.8 && (
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Times may need adjustment - monitor food carefully
        </p>
      )}
    </div>
  );
}