import React, { useState } from 'react';

const EXCEPTION_DOMAINS = [
  'wordpress.com',
  'wix.com',
  'godaddysites.com',
  'free.fr',
  'business.site',
  'schoolinsites.com',
  'schoolloop.com',
  'qq.com',
  'squarespace.com',
  'webnode.es',
  'weebly.com',
  'wixsite.com',
  'wpengine.com',
  'simplesite.com',
  'edu.gm',
  'edu.na',
  'ernet.in',
  'europa.eu',
  'hawaii.edu',
  'ac.bw',
  'ac.cd',
];

export const extractDomain = (url) => {
  if (!url) return undefined;

  const psl = require('psl');

  const _url = url.includes('@') ? url.split('@').pop() : url;

  const parsed = (() => {
    try {
      return psl.parse(new URL(_url).hostname);
    } catch {
      return psl.parse(_url.split('/').shift());
    }
  })();

  if (parsed) {
    return EXCEPTION_DOMAINS.includes(parsed.domain)
      ? `${parsed.subdomain}.${parsed.domain}`
      : parsed.domain;
  } else return undefined;
};
