// In src/components/CodingProfile.tsx
"use client";
import React, { useState, useEffect } from 'react';

// Define the props the component will accept
interface CodingProfileProps {
  githubUsername: string;
  leetcodeUsername: string;
  tufUsername: string;
  tufSolved: number;
}

// A reusable button component with the 3D block style, now using <img>
const ProfileLinkButton: React.FC<{ href: string; imgSrc: string; altText: string }> = ({ href, imgSrc, altText }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="block transition-transform duration-150 ease-in-out active:scale-95"
  >
    <div 
      className="bg-white p-1 rounded-sm flex items-center justify-center aspect-square border-3 border-b-6 border-r-6 border-black active:border-b-2 active:border-r-2"
    >
      <img src={imgSrc} alt={altText} className="w-6 h-6" />
    </div>
  </a>
);

// A reusable component for the stat display cards with the 3D shadow
const StatDisplayCard: React.FC<{ value: string | number }> = ({ value }) => (
    <div className="col-span-2 bg-white p-2 rounded-sm flex items-center justify-center border-3 border-b-6 border-r-6 border-black">
        <span className="text-xl font-bold text-gray-800">{value}</span>
    </div>
);


const CodingProfile: React.FC<CodingProfileProps> = ({ githubUsername, leetcodeUsername, tufUsername, tufSolved }) => {
  const [leetcodeStats, setLeetcodeStats] = useState({ solved: '...' });
  const [githubContributions, setGithubContributions] = useState('...');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCodingData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const leetcodeRes = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`);
        if (!leetcodeRes.ok) throw new Error('LeetCode user not found');
        const leetcodeData = await leetcodeRes.json();
        setLeetcodeStats({ solved: leetcodeData.totalSolved || 0 });

        const githubRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`);
        if (!githubRes.ok) throw new Error('GitHub user not found');
        const githubData = await githubRes.json();
        setGithubContributions(githubData.total?.lastYear || 0);
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch data');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchCodingData();
  }, [githubUsername, leetcodeUsername]);

  const renderStat = (stat: string | number) => {
    if (isLoading) return '...';
    if (error) return 'N/A';
    return stat;
  };

  return (
    // Increased width from max-w-sm to max-w-md
    <div className="bg-red-400 p-3 rounded-xl shadow-lg max-w-60 font-sans">
      <div className="grid grid-cols-3 gap-3">
        
        {/* Replace the 'imgSrc' with the path to your icon, e.g., "/icons/tuf.png" */}
        <ProfileLinkButton 
          href={`https://takeuforward.org/plus/profile/${tufUsername}`}
          imgSrc="TUF_LOGO.png"
          altText="TUF+ Profile"
        />

        <StatDisplayCard value={tufSolved} />

        <StatDisplayCard value={renderStat(leetcodeStats.solved)} />

        <ProfileLinkButton 
          href={`https://leetcode.com/${leetcodeUsername}`}
          imgSrc="LeetCode_Logo_.png"
          altText="LeetCode Profile"
        />

        <ProfileLinkButton 
          href={`https://github.com/${githubUsername}`}
          imgSrc="Github_Logo.png"
          altText="GitHub Profile"
        />

        <StatDisplayCard value={renderStat(githubContributions)} />

      </div>
       {error && <p className="text-center text-red-100 mt-4 bg-red-800/50 p-2 rounded-lg">{error}</p>}
    </div>
  );
};

export default CodingProfile;
