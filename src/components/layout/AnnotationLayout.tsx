// 'use client';
//
// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { PanelRightClose, PanelRightOpen } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
// } from "@/components/ui/tooltip";
//
// interface AnnotationLayoutProps {
//     children: React.ReactNode;
//     sidebarContent?: React.ReactNode;
// }
//
// export const AnnotationLayout: React.FC<AnnotationLayoutProps> = ({
//                                                                       children,
//                                                                       sidebarContent
//                                                                   }) => {
//     const [isExpanded, setIsExpanded] = useState(true);
//
//     return (
//         <div className="flex h-full">
//             {/* Main content */}
//             <div className="flex-1">
//                 {children}
//             </div>
//
//             {/* Right sidebar with toggle button */}
//             <div className="relative flex">
//                 {/* Toggle button */}
//                 <div className="absolute left-0 top-3 -translate-x-1/2 z-10">
//                     <TooltipProvider>
//                         <Tooltip>
//                             <TooltipTrigger asChild>
//                                 <Button
//                                     variant="secondary"
//                                     size="sm"
//                                     onClick={() => setIsExpanded(!isExpanded)}
//                                     className="h-6 w-6 rounded-full"
//                                 >
//                                     {isExpanded ? (
//                                         <PanelRightClose className="h-3 w-3" />
//                                     ) : (
//                                         <PanelRightOpen className="h-3 w-3" />
//                                     )}
//                                 </Button>
//                             </TooltipTrigger>
//                             <TooltipContent side="left">
//                                 <p>{isExpanded ? 'Ocultar panel' : 'Mostrar panel'}</p>
//                             </TooltipContent>
//                         </Tooltip>
//                     </TooltipProvider>
//                 </div>
//
//                 {/* Sidebar panel */}
//                 <aside
//                     className={cn(
//                         "border-l bg-background transition-all duration-300",
//                         isExpanded ? "w-80" : "w-0 opacity-0"
//                     )}
//                 >
//                     <div className={cn("h-full", !isExpanded && "hidden")}>
//                         {sidebarContent}
//                     </div>
//                 </aside>
//             </div>
//         </div>
//     );
// };
//
// export default AnnotationLayout;

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';


interface AnnotationLayoutProps {
    children: React.ReactNode;
    sidebarContent?: React.ReactNode;
}

export const AnnotationLayout: React.FC<AnnotationLayoutProps> = ({
                                                                      children,
                                                                      sidebarContent
                                                                  }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="flex h-full">
            {/* Main content */}
            <div className="flex-1 relative">
                {children}
            </div>

            {/* Right sidebar with toggle button */}
            <div className="relative flex h-full">
                {/* Toggle button */}
                <Button
                    variant="ghost"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn(
                        "absolute top-1/2 -translate-y-1/2 h-24 w-6 rounded-none",
                        "bg-background hover:bg-accent",
                        "border-y border-l",
                        "shadow-sm hover:shadow-md transition-all",
                        isExpanded ? "-left-6" : "-left-6"
                    )}
                >
                    {isExpanded ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <ChevronLeft className="h-4 w-4" />
                    )}
                </Button>

                {/* Sidebar panel */}
                <aside
                    className={cn(
                        "bg-card transition-all duration-300 ease-in-out border-l",
                        isExpanded ? "w-80" : "w-0"
                    )}
                >
                    <div className={cn("h-full", !isExpanded && "hidden")}>
                        {sidebarContent}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AnnotationLayout;