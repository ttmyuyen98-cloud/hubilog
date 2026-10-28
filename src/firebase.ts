/**
 * HUBI LOGISTICS - Firebase Configuration Architecture
 * Clean modular Firestore & Auth initialization with automatic cloud database detection
 * and resilient network fallback.
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  doc,
  getDocFromServer,
  enableIndexedDbPersistence,
} from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

// Load credentials from generated applet config or environment variables
let config: Record<string, string> = {
  projectId: 'cool-victory-mc70r',
  appId: '1:525852065174:web:f7a53122255c61ab4f31b7',
  apiKey: 'AIzaSyBA5LF1woLMoBkeHso_TGszg0p9l9YszAk',
  authDomain: 'cool-victory-mc70r.firebaseapp.com',
  firestoreDatabaseId: 'ai-studio-moi-2c41e0ee-f4de-4b51-9b6a-92fc498e7b17',
  storageBucket: 'cool-victory-mc70r.firebasestorage.app',
  messagingSenderId: '525852065174',
};

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fileConfig = require('../firebase-applet-config.json');
  if (fileConfig && fileConfig.projectId) {
    config = { ...config, ...fileConfig };
  }
} catch {
  // Use default or environment variables if file is absent
}

let firebaseAppInstance: FirebaseApp;
let firestoreDb: Firestore;
let firebaseAuth: Auth;

try {
  firebaseAppInstance = getApps().length > 0 ? getApp() : initializeApp(config);
  firebaseAuth = getAuth(firebaseAppInstance);
  if (config.firestoreDatabaseId) {
    firestoreDb = getFirestore(firebaseAppInstance, config.firestoreDatabaseId);
  } else {
    firestoreDb = getFirestore(firebaseAppInstance);
  }
} catch (error) {
  console.warn('[Firebase] Initialization notice:', error);
  // Fallback to default initialization
  firebaseAppInstance = getApps().length > 0 ? getApp() : initializeApp(config);
  firebaseAuth = getAuth(firebaseAppInstance);
  firestoreDb = getFirestore(firebaseAppInstance);
}

// Enable client offline persistence if supported in browser environment without blocking
if (typeof window !== 'undefined' && firestoreDb) {
  try {
    enableIndexedDbPersistence(firestoreDb).catch((err) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time.
        console.warn('[Firebase Persistence] Multi-tab active, persistence disabled for secondary tab.');
      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the features required to enable persistence
        console.warn('[Firebase Persistence] Browser does not support IndexedDB persistence.');
      }
    });
  } catch (err) {
    // Graceful fallback
  }
}

export const app = firebaseAppInstance;
export const db = firestoreDb;
export const auth = firebaseAuth;
export const projectId = config.projectId;
export const databaseId = config.firestoreDatabaseId || '(default)';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
    },
    operationType,
    path,
  };
  console.error('[Firestore Error]:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection(): Promise<boolean> {
  if (!db) return false;
  try {
    await getDocFromServer(doc(db, 'hubi_config', 'site_settings'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[Firebase] Client is offline or network is unreachable.');
    }
    return false;
  }
}
