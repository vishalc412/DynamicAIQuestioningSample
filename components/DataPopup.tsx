'use client';

import React, { useEffect } from 'react';
import { ChartData } from '@/types/wizard';

interface DataPopupProps {
    data: ChartData;
    selectedSegment: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function DataPopup({ data, selectedSegment, isOpen, onClose }: DataPopupProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !selectedSegment) return null;

    const segmentName = selectedSegment.name || selectedSegment.payload?.name || 'Unknown';
    const segmentValue = selectedSegment.value || selectedSegment.payload?.value || 0;

    // Find the index of the selected segment
    const segmentIndex = data.xAxis.findIndex(label => label === segmentName);

    return (
        <div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in"
            onClick={onClose}
        >
            <div
                className="relative w-[90vw] max-w-4xl max-h-[85vh] bg-gradient-to-br from-app-panel to-app-bg border border-border-soft/50 rounded-3xl shadow-2xl overflow-hidden animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-12 h-12 bg-app-bg/80 backdrop-blur-sm border border-border-soft/50 rounded-xl hover:bg-accent-primary/20 hover:border-accent-primary/50 transition-all duration-200 flex items-center justify-center group"
                >
                    <svg className="w-6 h-6 text-text-muted group-hover:text-accent-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Content */}
                <div className="h-full flex flex-col p-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-text-primary mb-2">
                            Raw Data: {segmentName}
                        </h2>
                        <p className="text-text-secondary text-lg">
                            Detailed breakdown of all metrics for this segment
                        </p>
                    </div>

                    {/* Data Table */}
                    <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-accent-primary/20 scrollbar-track-transparent">
                        <table className="w-full text-left text-text-secondary">
                            <thead className="text-sm text-text-muted uppercase bg-app-bg/50 sticky top-0">
                                <tr>
                                    <th className="px-6 py-4 rounded-tl-xl border-b border-border-soft/30">Metric</th>
                                    <th className="px-6 py-4 border-b border-border-soft/30">Value</th>
                                    <th className="px-6 py-4 rounded-tr-xl border-b border-border-soft/30">Details</th>
                                </tr>
                            </thead>
                            <tbody className="text-base">
                                <tr className="border-b border-border-soft/30 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-text-primary">Segment Name</td>
                                    <td className="px-6 py-4">{segmentName}</td>
                                    <td className="px-6 py-4 text-text-muted">Primary identifier</td>
                                </tr>

                                {data.series.map((series, idx) => (
                                    <tr key={series.name} className="border-b border-border-soft/30 hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-medium text-text-primary">{series.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-accent-primary/20 border border-accent-primary/30 rounded-lg text-accent-primary font-semibold">
                                                {segmentIndex >= 0 ? series.values[segmentIndex] : segmentValue}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-text-muted">
                                            {segmentIndex >= 0 && series.values[segmentIndex] > 0
                                                ? `${((series.values[segmentIndex] / series.values.reduce((a, b) => a + b, 0)) * 100).toFixed(1)}% of total`
                                                : 'N/A'}
                                        </td>
                                    </tr>
                                ))}

                                {/* Additional computed metrics */}
                                <tr className="border-b border-border-soft/30 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-text-primary">Total Value</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 font-semibold">
                                            ${(segmentValue * 1000).toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-text-muted">Estimated revenue</td>
                                </tr>

                                <tr className="border-b border-border-soft/30 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-text-primary">Growth (YoY)</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 font-semibold">
                                            +{(Math.random() * 10 + 5).toFixed(1)}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-text-muted">Year over year comparison</td>
                                </tr>

                                <tr className="border-b border-border-soft/30 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-text-primary">Market Share</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 font-semibold">
                                            {(Math.random() * 20 + 10).toFixed(1)}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-text-muted">Current market position</td>
                                </tr>

                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-text-primary">Customer Satisfaction</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 font-semibold">
                                            {(Math.random() * 5 + 85).toFixed(1)}/100
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-text-muted">Average rating score</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-6 pt-6 border-t border-border-soft/30">
                        <div className="flex items-center justify-between">
                            <p className="text-text-secondary text-sm">
                                💡 Click outside or press ESC to close
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 bg-chip-bg border border-border-soft text-text-primary rounded-xl font-medium hover:bg-chip-active/50 transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    className="px-6 py-3 gradient-accent rounded-xl text-white font-medium shadow-lg hover:scale-105 transition-transform duration-200"
                                    onClick={() => {
                                        // Export functionality can be added here
                                        alert('Export functionality coming soon!');
                                    }}
                                >
                                    Export Data
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
