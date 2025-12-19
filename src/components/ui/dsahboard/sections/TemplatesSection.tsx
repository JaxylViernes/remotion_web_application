import React, { useState } from "react";
import { templateCategories } from "../../../../data/DashboardCardsData";
import { TemplateCard } from "../TemplateCard";
import {
  FiLayout,
  FiFileText,
  FiMic,
  FiBarChart2,
  FiGrid,
  FiClock,
} from "react-icons/fi";

interface TemplatesSectionProps {
  onTry: (template: string, description: string) => void;
}

// Category cards data
const categoryCards = [
  {
    id: "all",
    title: "All",
    color: "bg-slate-200",
    activeColor: "bg-slate-300",
    textColor: "text-slate-800",
    icon: FiGrid,
    iconColor: "text-slate-600",
    glowColor: "bg-slate-400",
  },
  {
    id: "Text",
    title: "Text",
    color: "bg-amber-200",
    activeColor: "bg-amber-300",
    textColor: "text-amber-900",
    icon: FiFileText,
    iconColor: "text-amber-600",
    glowColor: "bg-amber-400",
  },
  {
    id: "Analytics",
    title: "Analytics",
    color: "bg-violet-200",
    activeColor: "bg-violet-300",
    textColor: "text-violet-900",
    icon: FiBarChart2,
    iconColor: "text-violet-600",
    glowColor: "bg-violet-400",
  },
  {
    id: "Layout",
    title: "Layout",
    color: "bg-rose-200",
    activeColor: "bg-rose-300",
    textColor: "text-rose-900",
    icon: FiLayout,
    iconColor: "text-rose-600",
    glowColor: "bg-rose-400",
  },
  {
    id: "Voiceovers",
    title: "Voiceovers",
    color: "bg-sky-200",
    activeColor: "bg-sky-300",
    textColor: "text-sky-900",
    icon: FiMic,
    iconColor: "text-sky-600",
    glowColor: "bg-sky-400",
  },
];

// Mock recent templates - Replace with actual usage tracking
const recentlyUsedTemplates = [
  "Split Screen",
  "Quote Spotlight",
  "Fake Text Conversation",
];

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({ onTry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const isExpanded = selectedCategory !== null;

  // Get all templates
  const allTemplates = Object.values(templateCategories).flat();
  
  // Get recently used templates
  const recentTemplates = allTemplates.filter((template) =>
    recentlyUsedTemplates.includes(template.name)
  );

  // Get displayed templates based on category
  const displayedTemplates =
    selectedCategory === "all" || selectedCategory === null
      ? allTemplates
      : templateCategories[selectedCategory as keyof typeof templateCategories] || [];

  // Filter by search
  const filteredTemplates = displayedTemplates.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="px-6 py-6 space-y-8">
      {/* Recently Used Templates Section */}
      {recentTemplates.length > 0 && !isExpanded && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FiClock className="text-indigo-600" size={20} />
            <h3 className="text-xl font-bold text-gray-900">
              Recently Used Templates
            </h3>
          </div>
          
          {/* Horizontal scrollable cards - Same design as HomePage */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {recentTemplates.map((template) => (
              <div
                key={template.name}
                className="flex-shrink-0"
                style={{ 
                  width: '200px',
                  aspectRatio: '9/16'
                }}
              >
                <div
                  onClick={() => onTry(template.name, template.description)}
                  className="group relative overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 h-full"
                >
                  {/* Background Image with Zoom Effect */}
                  <img
                    src={template.url}
                    alt={template.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-3 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-3 w-full">
                    <h3 className="text-sm font-bold text-white mb-0.5 group-hover:text-purple-300 transition-colors duration-300">
                      {template.name}
                    </h3>
                    <div className="flex items-center text-slate-300 text-xs gap-2">
                      <span className="flex items-center gap-0.5">
                        <FiClock className="w-3 h-3" />
                        Recently used
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Explore Templates Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          {isExpanded ? "Available Templates" : "Explore Templates"}
        </h2>

        {/* Category Cards with Canva Glow */}
        <div className="relative overflow-hidden rounded-2xl p-2 sm:p-3">
          {/* Glow Background */}
          <div className="absolute -top-10 -left-10 w-[250px] h-[250px] rounded-full bg-cyan-200 opacity-50 blur-[80px]" />
          <div className="absolute -top-5 right-0 w-[200px] h-[200px] rounded-full bg-fuchsia-200 opacity-50 blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] rounded-full bg-violet-200 opacity-40 blur-[100px]" />
          <div className="absolute inset-0 bg-white/40 rounded-2xl" />

          {/* Category Cards Grid */}
          <div className="relative z-10 flex flex-wrap gap-3">
            {categoryCards.map((category) => {
              const IconComponent = category.icon;
              const isActive = selectedCategory === category.id;
              const handleClick = () => {
                if (selectedCategory === category.id) {
                  setSelectedCategory(null);
                } else {
                  setSelectedCategory(category.id);
                }
              };
              return (
                <div
                  key={category.id}
                  onClick={handleClick}
                  className={`relative ${isActive ? category.activeColor : category.color}
                    rounded-2xl h-20 sm:h-24 w-28 sm:w-36 p-3
                    cursor-pointer overflow-hidden group
                    hover:shadow-lg hover:-translate-y-1
                    transition-all duration-300
                    ${isActive ? "ring-2 ring-indigo-500 shadow-lg" : ""}`}
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute -top-6 -left-6 w-20 h-20 rounded-full
                      ${category.glowColor} ${isActive ? "opacity-60" : "opacity-30"}
                      blur-xl group-hover:opacity-50 transition-opacity duration-300`}
                  />
                  <div
                    className={`absolute -bottom-4 -right-4 w-16 h-16 rounded-full
                      ${category.glowColor} ${isActive ? "opacity-50" : "opacity-20"}
                      blur-lg group-hover:opacity-40 transition-opacity duration-300`}
                  />

                  {/* Title */}
                  <div className="absolute bottom-2 left-3 z-10">
                    <h3 className={`font-semibold text-xs sm:text-sm ${category.textColor}`}>
                      {category.title}
                    </h3>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-2 right-2 z-10">
                    <IconComponent
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${category.iconColor}
                        ${isActive ? "opacity-100" : "opacity-60"} group-hover:opacity-80
                        transform rotate-12 group-hover:rotate-6
                        transition-all duration-300`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Collapsible Grid Section */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-6">
          {/* Search & Count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              {selectedCategory === "all" ? "All Templates" : `${selectedCategory} Templates`}
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({filteredTemplates.length})
              </span>
            </h3>

            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-80 md:w-96 px-4 py-2.5 border border-gray-200
                rounded-xl shadow-sm bg-white
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                transition text-sm sm:text-base"
            />
          </div>

          {/* Template Grid - Matching HomePage style */}
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.name}
                label={template.url}
                name={template.name}
                description={template.description}
                onTry={onTry}
                available={template.available}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-2">No templates found</p>
              <p className="text-sm text-gray-400">
                Try a different search term or category
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};