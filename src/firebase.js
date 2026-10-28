/**
 * HUBI LOGISTICS - Firebase Configuration (JS Modular Entry)
 * Clean modular Firebase v10 initialization exporting `db` and `auth`.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'cool-victory-mc70r',
  appId: '1:525852065174:web:f7a53122255c61ab4f31b7',
  apiKey: 'AIzaSyBA5LF1woLMoBkeHso_TGszg0p9l9YszAk',
  authDomain: 'cool-victory-mc70r.firebaseapp.com',
  firestoreDatabaseId: 'ai-studio-moi-2c41e0ee-f4de-4b51-9b6a-92fc498e7b17',
  storageBucket: 'cool-victory-mc70r.firebasestorage.app',
  messagingSenderId: '525852065174',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

if (typeof window !== 'undefined') {
  try {
    enableIndexedDbPersistence(db).catch((err) => {
      if (err.code !== 'failed-precondition' && err.code !== 'unimplemented') {
        console.warn('[Firebase] Persistence fallback:', err);
      }
    });
  } catch {
    // Ignore in unsupported environments
  }
}

export const OperationType = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write',
};

export function handleFirestoreError(error, operationType, path) {
  const errInfo = {
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

export async function testConnection() {
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

export { app, db, auth };
export const projectId = firebaseConfig.projectId;
export const databaseId = firebaseConfig.firestoreDatabaseId || '(default)';
