import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import { Clock, Heart, History } from "lucide-react"; // Added missing imports
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Added for prop-types validation

// EmptyState component with prop-types validation
const EmptyState = ({ title, message }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-center max-w-sm">{message}</p>
  </div>
);

// Prop-types validation for EmptyState
EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

const MyLikedArtifacts = () => {
  const { user } = useAuth();
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    setLoading(true);
    setError(null); // Reset error state
    fetch(`https://historical-artifacts-server.vercel.app/liked-artifact?email=${user.email}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch liked artifacts");
        }
        return res.json();
      })
      .then((data) => {
        setLikes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Unable to load liked artifacts. Please try again later.");
        setLoading(false);
      });
  }, [user.email]);

  // Format date for display (assuming createdAt is a date string)
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString; // Fallback to raw string if parsing fails
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-16">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-teal-600 dark:from-amber undeniably-600 dark:via-amber-400 dark:to-teal-500"></div>
        <div className="container mx-auto px-4">
          <EmptyState
            title="Error Loading Artifacts"
            message={error}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-teal-600 dark:from-amber-600 dark:via-amber-400 dark:to-teal-500"></div>

      <Helmet>
        <title>Liked Artifacts | Historical Collection</title>
      </Helmet>

      {/* Header */}
      <div className="relative py-16 bg-slate-100 dark:bg-slate-800">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-teal-600 dark:from-amber-600 dark:via-amber-400 dark:to-teal-500"></div>
          <div className="container mx-auto px-5">
            <div className="w-16 h-1 bg-amber-500 dark:bg-amber-400 mb-4 mx-auto"></div>
            <h1 className="text-3xl md:text-5xl eb-garamond font-bold text-center text-slate-800 dark:text-amber-50">
              My Favorites Collection
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-amber-100/80 text-center max-w-3xl mx-auto mt-4 font-light outfit">
              Historical artifacts you've marked as favorites
              {likes.length > 0 && (
                <span className="font-semibold">
                  {" "}
                  · {likes.length} artifact{likes.length !== 1 ? "s" : ""}
                </span>
              )}
            </p>
          </div>
          {/* Decorative corner elements */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-amber-500/40 dark:border-amber-400/30 hidden md:block"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-amber-500/40 dark:border-amber-400/30 hidden md:block"></div>
        </div>

      <div className="container mx-auto px-4 py-10">
        {likes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 mb-6">
              <Heart size={32} className="text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-amber-50 mb-3 eb-garamond">
              No liked artifacts yet
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-center max-w-md outfit">
              Explore our collection and like artifacts that interest you to see them here.
            </p>
            <Link
              to="/artifacts"
              className="mt-6 px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-600 dark:from-amber-600 dark:to-amber-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-amber-600 hover:to-amber-500 dark:hover:from-amber-500 dark:hover:to-amber-400 outfit flex items-center"
            >
              <History size={18} className="mr-2" />
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[640px]">
                {/* Added min-w to prevent table from collapsing on small screens */}
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700/50">
                    <th className="text-left py-4 px-6 text-sm text-slate-600 dark:text-slate-300 font-semibold outfit">
                      #
                    </th>
                    <th className="text-left py-4 px-6 text-sm text-slate-600 dark:text-slate-300 font-semibold outfit">
                      Artifact Name
                    </th>
                    <th className="text-left py-4 px-6 text-sm text-slate-600 dark:text-slate-300 font-semibold outfit">
                      Type
                    </th>
                    <th className="text-left py-4 px-6 text-sm text-slate-600 dark:text-slate-300 font-semibold outfit">
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        Historical Period
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {likes.map((like, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="py-4 px-6 text-slate-800 dark:text-slate-200 outfit">
                        {index + 1}
                      </td>
                      <td className="py-4 px-6 text-slate-800 dark:text-slate-200 outfit font-medium">
                        {like.artifactName}
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 outfit">
                          {like.artifactType}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-800 dark:text-slate-200 outfit">
                        {like.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Explore More Button */}
        {likes.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Link
              to="/allartifacts"
              className="px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-600 dark:from-amber-600 dark:to-amber-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-amber-600 hover:to-amber-500 dark:hover:from-amber-500 dark:hover:to-amber-400 outfit flex items-center"
            >
              <History size={18} className="mr-2" />
              Explore More Artifacts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLikedArtifacts;