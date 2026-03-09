/**
 * src/hooks/usePosts.js
 * ─────────────────────────────────────────────────────────────────
 * React hooks for blog post data.
 * Components use these hooks — they don't import from blogPosts.js directly.
 *
 * Usage examples:
 *
 *   // All posts (in Blog.jsx)
 *   const { posts, loading } = usePosts();
 *
 *   // Single post (in BlogPost.jsx)
 *   const { post, loading } = usePost(slug);
 *
 *   // Recent posts for homepage
 *   const { posts } = useRecentPosts(3);
 *
 *   // Bangla equivalents
 *   const { posts } = usePostsBn();
 *   const { post }  = usePostBn(slug);
 * ─────────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react';
import { getAllPosts, getPostBySlug, getRecentPosts, getPostsByCategory } from '../api/posts.js';
import { getAllPostsBn, getPostBnBySlug, getRecentPostsBn } from '../api/postsBn.js';

// ─── Helper ───────────────────────────────────────────────────────
function useAsync(asyncFn, deps = []) {
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        let cancelled = false;
        setState(s => ({ ...s, loading: true }));

        asyncFn()
            .then(data => { if (!cancelled) setState({ data, loading: false, error: null }); })
            .catch(err  => { if (!cancelled) setState({ data: null, loading: false, error: err }); });

        return () => { cancelled = true; };
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps

    return state;
}

// ─── English post hooks ───────────────────────────────────────────

/** All published EN posts */
export function usePosts() {
    const { data, loading, error } = useAsync(() => getAllPosts(), []);
    return { posts: data ?? [], loading, error };
}

/** Single EN post by slug */
export function usePost(slug) {
    const { data, loading, error } = useAsync(() => getPostBySlug(slug), [slug]);
    return { post: data ?? null, loading, error };
}

/** N most recent EN posts */
export function useRecentPosts(limit = 3) {
    const { data, loading, error } = useAsync(() => getRecentPosts(limit), [limit]);
    return { posts: data ?? [], loading, error };
}

/** EN posts filtered by category */
export function usePostsByCategory(category) {
    const { data, loading, error } = useAsync(
        () => getPostsByCategory(category),
        [category]
    );
    return { posts: data ?? [], loading, error };
}

// ─── Bangla post hooks ────────────────────────────────────────────

/** All published BN posts */
export function usePostsBn() {
    const { data, loading, error } = useAsync(() => getAllPostsBn(), []);
    return { posts: data ?? [], loading, error };
}

/** Single BN post by slug */
export function usePostBn(slug) {
    const { data, loading, error } = useAsync(() => getPostBnBySlug(slug), [slug]);
    return { post: data ?? null, loading, error };
}

/** N most recent BN posts */
export function useRecentPostsBn(limit = 3) {
    const { data, loading, error } = useAsync(() => getRecentPostsBn(limit), [limit]);
    return { posts: data ?? [], loading, error };
}
