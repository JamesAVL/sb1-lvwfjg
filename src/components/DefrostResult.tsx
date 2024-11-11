import React from 'react';
import { Card } from './ui/card';
import type { DefrostResult as DefrostResultType } from '../types/DefrostTypes';

interface DefrostResultProps {
  result: DefrostResultType;
}

export function DefrostResult({ result }: DefrostResultProps) {
  return (
    <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
      <h3 className="font-medium">Defrosting Instructions:</h3>
      {result.power && result.time && (
        <p>1. Set to {result.power}W for {result.time} minutes</p>
      )}
      {result.power2 && result.timeRange && (
        <p>2. Then set to {result.power2}W for {result.timeRange[0]}-{result.timeRange[1]} minutes</p>
      )}
      {!result.power2 && result.timeRange && (
        <p>Defrost at {result.power}W for {result.timeRange[0]}-{result.timeRange[1]} minutes</p>
      )}
      
      <div className="mt-4">
        <p className="text-sm text-slate-600">Standing Time: {result.standingTime} minutes</p>
        <p className="text-sm text-slate-600 mt-2">Note: {result.notes}</p>
        
        <div className="mt-4">
          <p className="text-sm font-medium">Calculation Confidence:</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div 
              className={`h-2.5 rounded-full ${
                result.confidence > 0.8 ? 'bg-green-500' :
                result.confidence > 0.5 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.max(0, Math.min(100, result.confidence * 100))}%` }}
            />
          </div>
          {result.confidence < 0.8 && (
            <p className="text-xs text-slate-500 mt-1">
              Times may need adjustment - monitor food carefully
            </p>
          )}
        </div>

        {result.safetyNotes && result.safetyNotes.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium">Safety Notes:</p>
            <ul className="list-disc list-inside text-sm text-slate-600 mt-1">
              {result.safetyNotes.map((note: string, index: number) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}