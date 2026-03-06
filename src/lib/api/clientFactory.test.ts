import { describe, it, expect } from 'vitest';
import { normalizeInstanceUrl } from './clientFactory';

describe('normalizeInstanceUrl', () => {
    it('adds https when scheme is missing', () => {
        expect(normalizeInstanceUrl('mirth.local:8443')).toBe(
            'https://mirth.local:8443/api',
        );
    });

    it('fixes common missing-colon typo', () => {
        expect(normalizeInstanceUrl('https//mirth.local:8443')).toBe(
            'https://mirth.local:8443/api',
        );
    });

    it('keeps valid http urls', () => {
        expect(normalizeInstanceUrl('http://localhost:8080')).toBe(
            'http://localhost:8080/api',
        );
    });

    it('keeps existing /api suffix', () => {
        expect(normalizeInstanceUrl('https://mirth.local:8443/api')).toBe(
            'https://mirth.local:8443/api',
        );
    });

    it('appends /api to existing path', () => {
        expect(normalizeInstanceUrl('https://mirth.local:8443/mirth')).toBe(
            'https://mirth.local:8443/mirth/api',
        );
    });

    it('rejects unsupported schemes', () => {
        expect(() => normalizeInstanceUrl('ftp://mirth.local')).toThrow(
            'Unsupported URL protocol',
        );
    });
});
