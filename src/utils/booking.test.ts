import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateBookingForm,
  generateBookingReference,
  calculateDeliveryEconomics,
  validateContactForm,
} from './booking';

test('validateBookingForm accepts complete and valid inputs', () => {
  const result = validateBookingForm({
    fullName: 'Trần Thị Mỹ Uyên',
    pickupPoint: 'Tòa Landmark 2, Sảnh A',
    dropoffPoint: 'Tòa Park 6, Căn 12.08',
    timeSlot: 'slot_evening',
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('validateBookingForm rejects empty inputs with accurate messages', () => {
  const result = validateBookingForm({
    fullName: '',
    pickupPoint: '',
    dropoffPoint: '',
    timeSlot: '',
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.pickupPoint);
  assert.ok(result.errors.dropoffPoint);
  assert.ok(result.errors.timeSlot);
});

test('generateBookingReference produces expected prefix and pattern', () => {
  const ref = generateBookingReference('HUBI');
  assert.match(ref, /^HUBI-\d{4}-\d{4}$/);
});

test('calculateDeliveryEconomics calculates 60% savings accurately', () => {
  const economics = calculateDeliveryEconomics(1);
  assert.equal(economics.singleRate, 35000);
  assert.equal(economics.hubiRate, 14000);
  assert.equal(economics.savedAmount, 21000);
  assert.equal(economics.savingsPercent, 60);

  const multiple = calculateDeliveryEconomics(3);
  assert.equal(multiple.singleRate, 105000);
  assert.equal(multiple.hubiRate, 42000);
});

test('validateContactForm checks email format and message length', () => {
  const valid = validateContactForm('Uyên', 'ttmyuyen98@gmail.com', 'Tôi muốn tìm hiểu dịch vụ gom đơn.');
  assert.equal(valid.isValid, true);

  const invalidEmail = validateContactForm('Uyên', 'not-an-email', 'Chào nhóm dự án HUBI');
  assert.equal(invalidEmail.isValid, false);
  assert.ok(invalidEmail.errors.email);
});

test('computeBookingFees calculates accurate fees and savings', async () => {
  const { computeBookingFees } = await import('../services/bookingService');
  const standard = computeBookingFees('standard');
  assert.equal(standard.estimatedFee, 15000);
  assert.equal(standard.singleRate, 38000);
  assert.equal(standard.savedAmount, 23000);

  const bulky = computeBookingFees('bulky');
  assert.equal(bulky.estimatedFee, 20000);
  assert.equal(bulky.savedAmount, 28000);
});

test('initiateOptimisticBooking creates instant optimistic entity with background commit promise', async () => {
  const { initiateOptimisticBooking } = await import('../services/bookingService');
  const { optimisticBooking, commitPromise } = initiateOptimisticBooking({
    fullName: 'Hoàng Văn Cường',
    phone: '0901234567',
    pickupPoint: 'Tòa Landmark 3 - Căn 1002',
    dropoffPoint: 'Tòa Park 2 - Căn 0501',
    timeSlot: 'slot_morning',
  });

  assert.equal(optimisticBooking.fullName, 'Hoàng Văn Cường');
  assert.equal(optimisticBooking.isOptimistic, true);
  assert.equal(optimisticBooking.syncStatus, 'syncing');
  assert.match(optimisticBooking.bookingCode, /^HUBI-\d{5}$/);
  assert.ok(commitPromise instanceof Promise);
});


