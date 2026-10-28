import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

let firestoreDb: Firestore | null = null;
let firebaseAuth: Auth | null = null;
let firebaseAppInstance: FirebaseApp | null = null;

try {
  firebaseAppInstance = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  firebaseAuth = getAuth(firebaseAppInstance);
  if (firebaseConfig.firestoreDatabaseId) {
    firestoreDb = getFirestore(firebaseAppInstance, firebaseConfig.firestoreDatabaseId);
  } else {
    firestoreDb = getFirestore(firebaseAppInstance);
  }
} catch (error) {
  console.warn('Firebase initialization notice:', error);
}

export const app = firebaseAppInstance;
export const db = firestoreDb;
export const auth = firebaseAuth;
export const databaseId = firebaseConfig.firestoreDatabaseId || 'default';
export const projectId = firebaseConfig.projectId || '';

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
    tenantId?: string | null;
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
      tenantId: auth?.currentUser?.tenantId || null,
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection(): Promise<boolean> {
  if (!db) return false;
  try {
    await getDocFromServer(doc(db, 'hubi_config', 'site_settings'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or network unreachable.');
    }
    return false;
  }
}
