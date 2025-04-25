import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import { Clock, Heart, History } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// EmptyState component with prop-types validation
const EmptyState = ({ title, message }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <h3 className="text-xl font-semibold custom-text-primary mb-2">{title}</h3>
    <p className="custom-text-secondary text-center max-w-sm">{message}</p>
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
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
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

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen custom-bg-primary flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[var(--text-accent)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen custom-bg-primary py-16">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--text-accent)] via-amber-700 to-teal-600"></div>
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
    <div className="min-h-screen custom-bg-primary">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--text-accent)] via-amber-700 to-teal-600"></div>

      <Helmet>
        <title>Liked Artifacts | Historical Collection</title>
      </Helmet>

      {/* Header */}
      <div className="relative py-16 custom-bg-secondary">
        <div className="container mx-auto px-5">
          <div className="w-16 h-1 custom-bg-accent mb-4 mx-auto"></div>
          <h1 className="text-3xl md:text-5xl eb-garamond font-bold text-center custom-text-primary">
            My Favorites Collection
          </h1>
          <p className="text-base md:text-lg custom-text-secondary text-center max-w-3xl mx-auto mt-4 font-light outfit">
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
        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[var(--text-accent)]/40 hidden md:block"></div>
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[var(--text-accent)]/40 hidden md:block"></div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {likes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 custom-bg-secondary rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="w-16 h-16 flex items-center justify-center rounded-full custom-bg-accent mb-6">
              <Heart size={32} className="custom-text-accent" />
            </div>
            <h3 className="text-2xl font-semibold custom-text-primary mb-3 eb-garamond">
              No liked artifacts yet
            </h3>
            <p className="custom-text-secondary text-center max-w-md outfit">
              Explore our collection and like artifacts that interest you to see them here.
            </p>
            <Link
              to="/allartifacts"
              
              className="mt-6 px-6 py-3 bg-gradient-to-r from-[var(--text-accent)] to-amber-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:custom-bg-accent outfit flex items-center"
            >
              <History size={18} className="mr-2" />
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="custom-bg-secondary rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[640px]">
                <thead>
                  <tr className="custom-bg-primary">
                    <th className="text-left py-4 px-6 text-sm custom-text-secondary font-semibold outfit">
                      #
                    </th>
                    <th className="text-left py-4 px-6 text-sm custom-text-secondary font-semibold outfit">
                      Artifact Name
                    </th>
                    <th className="text-left py-4 px-6 text-sm custom-text-secondary font-semibold outfit">
                      Type
                    </th>
                    <th className="text-left py-4 px-6 text-sm custom-text-secondary font-semibold outfit">
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1 custom-text-accent" />
                        Historical Period
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {likes.map((like, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-200 dark:border-slate-700 hover:custom-bg-primary transition-colors"
                    >
                      <td className="py-4 px-6 custom-text-primary outfit">
                        {index + 1}
                      </td>
                      <td className="py-4 px-6 custom-text-primary outfit font-medium">
                        {like.artifactName}
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full text-xs font-medium custom-bg-accent custom-text-accent outfit">
                          {like.artifactType}
                        </span>
                      </td>
                      <td className="py-4 px-6 custom-text-primary outfit">
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
              className="px-6 py-3 bg-gradient-to-r from-[var(--text-accent)] to-amber-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:custom-bg-accent outfit flex items-center"
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