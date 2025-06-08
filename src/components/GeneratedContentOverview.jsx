<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import BlogDisplay from './BlogDisplay';
import LinkedInDisplay from './LinkedInDisplay';
import NewsletterDisplay from './NewsletterDisplay';
import TwitterDisplay from './TwitterDisplay'; // Ensure correct path if needed

const GeneratedContentOverview = ({ generatedContent, onCopy, copiedSection, onSave }) => {
  // Internal state to manage which content type is currently displayed
  const [activeSubTab, setActiveSubTab] = useState('blog');

  // Set default active sub-tab based on what content is available
  useEffect(() => {
=======
// src/components/GeneratedContentOverview.jsx
import React, { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';

import BlogDisplay from './BlogDisplay';
import LinkedInDisplay from './LinkedInDisplay';
import NewsletterDisplay from './NewsletterDisplay';
import TwitterDisplay from './TwitterDisplay';

const GeneratedContentOverview = ({
  generatedContent,
  onCopy,
  copiedSection,
  onSave,
}) => {
  const [activeSubTab, setActiveSubTab] = useState('blog');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  // DEBUG: Log generatedContent on change
  useEffect(() => {
    console.log('[useEffect] generatedContent:', generatedContent);

>>>>>>> 44625a2 (new)
    if (generatedContent.blog) setActiveSubTab('blog');
    else if (generatedContent.linkedin) setActiveSubTab('linkedin');
    else if (generatedContent.newsletter) setActiveSubTab('newsletter');
    else if (generatedContent.twitter) setActiveSubTab('twitter');
<<<<<<< HEAD
  }, [generatedContent]); // Re-evaluate when generatedContent changes

  const hasContent = generatedContent.blog || generatedContent.linkedin || generatedContent.newsletter || generatedContent.twitter;

  if (!hasContent) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">No Generated Content Yet</h2>
        <p className="text-gray-500">Please go to the Dashboard and generate some content first!</p>
=======
  }, [generatedContent]);

  const hasContent =
    generatedContent.blog ||
    generatedContent.linkedin ||
    generatedContent.newsletter ||
    generatedContent.twitter;

  const handleSave = async () => {
    console.log('[handleSave] Save button clicked');
    const auth = getAuth();
    const user = auth.currentUser;
    console.log('[handleSave] currentUser:', user);

    if (!user) {
      setSaveMsg('You must be logged in to save.');
      console.warn('[handleSave] No user logged in');
      return;
    }

    const payload = {
      uid: user.uid,
      email: user.email,
      blog: generatedContent.blog || null,
      linkedin: generatedContent.linkedin || null,
      newsletter: generatedContent.newsletter || null,
      twitter: generatedContent.twitter || null,
      createdAt: serverTimestamp(),
    };

    console.log('[handleSave] Payload:', payload);

    setSaving(true);
    setSaveMsg('');

    try {
      const docRef = await addDoc(collection(db, 'generated_contents'), payload);
      console.log('[handleSave] Document saved with ID:', docRef.id);
      setSaveMsg('Saved to your library ✅');
      if (onSave) {
        console.log('[handleSave] Calling onSave callback');
        onSave();
      }
    } catch (err) {
      console.error('[handleSave] Firestore save error:', err);
      setSaveMsg('❌ Failed to save. Please retry.');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(''), 4000);
      console.log('[handleSave] Save operation finished');
    }
  };

  if (!hasContent) {
    console.log('[Render] No content to show');
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          No Generated Content Yet
        </h2>
        <p className="text-gray-500">
          Please go to the Dashboard and generate some content first!
        </p>
>>>>>>> 44625a2 (new)
      </div>
    );
  }

<<<<<<< HEAD
  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Your Generated Content</h2>

      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActiveSubTab('blog')}
          className={`py-3 px-6 text-lg font-medium transition-colors duration-200
            ${activeSubTab === 'blog' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-gray-800'}
            ${!generatedContent.blog ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!generatedContent.blog}
        >
          Blog Post
        </button>
        <button
          onClick={() => setActiveSubTab('linkedin')}
          className={`py-3 px-6 text-lg font-medium transition-colors duration-200
            ${activeSubTab === 'linkedin' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-gray-800'}
            ${!generatedContent.linkedin ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!generatedContent.linkedin}
        >
          LinkedIn Post
        </button>
        <button
          onClick={() => setActiveSubTab('newsletter')}
          className={`py-3 px-6 text-lg font-medium transition-colors duration-200
            ${activeSubTab === 'newsletter' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-gray-800'}
            ${!generatedContent.newsletter ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!generatedContent.newsletter}
        >
          Newsletter
        </button>
        <button
          onClick={() => setActiveSubTab('twitter')}
          className={`py-3 px-6 text-lg font-medium transition-colors duration-200
            ${activeSubTab === 'twitter' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-gray-800'}
            ${!generatedContent.twitter ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!generatedContent.twitter}
        >
          Twitter/X Post
        </button>
      </div>

      {/* Render content based on active sub-tab */}
      {activeSubTab === 'blog' && generatedContent.blog && (
        <BlogDisplay content={generatedContent.blog} onCopy={onCopy} copiedSection={copiedSection} onSave={onSave} />
      )}
      {activeSubTab === 'linkedin' && generatedContent.linkedin && (
        <LinkedInDisplay content={generatedContent.linkedin} onCopy={onCopy} copiedSection={copiedSection} onSave={onSave} linkedinImage={generatedContent.linkedinImage} />
      )}
      {activeSubTab === 'newsletter' && generatedContent.newsletter && (
        <NewsletterDisplay content={generatedContent.newsletter} onCopy={onCopy} copiedSection={copiedSection} onSave={onSave} />
      )}
      {activeSubTab === 'twitter' && generatedContent.twitter && (
        <TwitterDisplay content={generatedContent.twitter} onCopy={onCopy} copiedSection={copiedSection} onSave={onSave} twitterImage={generatedContent.twitterImage} />
      )}

      {/* Message if no content is generated for the selected sub-tab */}
      {!generatedContent[activeSubTab] && hasContent && (
        <p className="text-center text-gray-500 mt-8">No {activeSubTab.replace('linkedin', 'LinkedIn').replace('blog', 'blog post').replace('newsletter', 'newsletter draft').replace('twitter', 'Twitter/X post')} generated yet for the current settings.</p>
=======
  console.log('[Render] Active Tab:', activeSubTab);
  console.log('[Render] Content Available:', {
    blog: !!generatedContent.blog,
    linkedin: !!generatedContent.linkedin,
    newsletter: !!generatedContent.newsletter,
    twitter: !!generatedContent.twitter,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in border border-gray-200">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold text-gray-800">
          Your Generated Content
        </h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 disabled:opacity-50 flex items-center"
        >
          {saving ? 'Saving…' : 'Save to Library'}
        </button>
      </div>

      {saveMsg && (
        <p className="mb-4 text-center text-sm text-gray-600">{saveMsg}</p>
      )}

      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto whitespace-nowrap">
        {[
          ['blog', 'Blog Post'],
          ['linkedin', 'LinkedIn Post'],
          ['newsletter', 'Newsletter'],
          ['twitter', 'Twitter/X Post'],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveSubTab(key)}
            disabled={!generatedContent[key]}
            className={`py-3 px-6 text-lg font-medium transition-colors duration-200
              ${activeSubTab === key
                ? 'text-blue-700 border-b-2 border-blue-700'
                : 'text-gray-600 hover:text-gray-800'}
              ${!generatedContent[key] ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeSubTab === 'blog' && generatedContent.blog && (
        <BlogDisplay
          content={generatedContent.blog}
          onCopy={onCopy}
          copiedSection={copiedSection}
          onSave={onSave}
        />
      )}
      {activeSubTab === 'linkedin' && generatedContent.linkedin && (
        <LinkedInDisplay
          content={generatedContent.linkedin}
          linkedinImage={generatedContent.linkedinImage}
          onCopy={onCopy}
          copiedSection={copiedSection}
          onSave={onSave}
        />
      )}
      {activeSubTab === 'newsletter' && generatedContent.newsletter && (
        <NewsletterDisplay
          content={generatedContent.newsletter}
          onCopy={onCopy}
          copiedSection={copiedSection}
          onSave={onSave}
        />
      )}
      {activeSubTab === 'twitter' && generatedContent.twitter && (
        <TwitterDisplay
          content={generatedContent.twitter}
          twitterImage={generatedContent.twitterImage}
          onCopy={onCopy}
          copiedSection={copiedSection}
          onSave={onSave}
        />
      )}

      {!generatedContent[activeSubTab] && hasContent && (
        <p className="text-center text-gray-500 mt-8">
          No{' '}
          {activeSubTab
            .replace('linkedin', 'LinkedIn')
            .replace('blog', 'blog post')
            .replace('newsletter', 'newsletter draft')
            .replace('twitter', 'Twitter/X post')}{' '}
          generated yet for the current settings.
        </p>
>>>>>>> 44625a2 (new)
      )}
    </div>
  );
};

export default GeneratedContentOverview;
