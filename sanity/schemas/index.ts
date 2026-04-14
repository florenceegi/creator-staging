/**
 * @package CREATOR-STAGING — Sanity Schema Index
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — CREATOR-STAGING)
 * @date 2026-04-10
 * @purpose Central export of all Sanity document schemas
 */

import artistProfile from './artistProfile';
import exhibition from './exhibition';
import pressItem from './pressItem';
import series from './series';

export const schemaTypes = [artistProfile, exhibition, pressItem, series];
