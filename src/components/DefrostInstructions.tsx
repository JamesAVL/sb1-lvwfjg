import React from 'react';
import { Timer, ThermometerSun, AlertTriangle } from 'lucide-react';
import { ConfidenceIndicator } from './ConfidenceIndicator';
import type { DefrostResult } from '../types/DefrostTypes';

interface DefrostInstructionsProps {
  result: DefrostResult;
}

export function DefrostInstructions({ result }: DefrostInstructionsProps) {
  return (
    <div className="mt-6 space-y-6 bg-slate-50 p-6 rounded-lg">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Timer className="w-5 h-5 text-blue-500" />
          Defrosting Instructions
        </h2>
        
        <div className="pl-4 border-l-2 border-blue-100">
          {result.settings.power && result.settings.time && (
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm">1</div>
              <p>Set to {result.settings.power}W for {result.settings.time} minutes</p>
            </div>
          )}
          
          {result.settings.power2 && result.settings.timeRange && (
            <div className="flex items-center gap-2 mt-3 text-gray-700">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm">2</div>
              <p>Then set to {result.settings.power2}W for {result.settings.timeRange[0]}-{result.settings.timeRange[1]} minutes</p>
            </div>
          )}
          
          {!result.settings.power2 && result.settings.timeRange && (
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm">1</div>
              <p>Defrost at {result.settings.power}W for {result.settings.timeRange[0]}-{result.settings.timeRange[1]} minutes</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-600">
        <ThermometerSun className="w-5 h-5 text-orange-500" />
        <p className="text-sm">Standing Time: {result.standingTime} minutes</p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Note:</span> {result.notes}
        </p>
      </div>

      {result.settings.confidence !== undefined && (
        <ConfidenceIndicator confidence={result.settings.confidence} />
      )}

      <div className="bg-orange-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <h3 className="text-sm font-medium">Safety Notes:</h3>
        </div>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          {result.safetyNotes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}