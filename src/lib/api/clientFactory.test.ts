import { describe, it, expect } from 'vitest';
import { normalizeInstanceUrl } from './clientFactory';

describe('normalizeInstanceUrl', () => {
    it('adds https when scheme is missing', () => {
        expect(normalizeInstanceUrl('mirth.local:8443')).toBe(
            'https://mirth.local:8443/',
        );
    });

    it('fixes common missing-colon typo', () => {
        expect(normalizeInstanceUrl('https//mirth.local:8443')).toBe(
            'https://mirth.local:8443/',
        );
    });

    it('keeps valid http urls', () => {
        expect(normalizeInstanceUrl('http://localhost:8080')).toBe(
            'http://localhost:8080/',
        );
    });

    it('rejects unsupported schemes', () => {
        expect(() => normalizeInstanceUrl('ftp://mirth.local')).toThrow(
            'Unsupported URL protocol',
        );
    });
});
