export interface BookingFormData {
  fullName: string;
  pickupPoint: string;
  dropoffPoint: string;
  timeSlot: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateBookingForm(data: BookingFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Vui lòng nhập họ và tên (tối thiểu 2 ký tự)';
  }

  if (!data.pickupPoint || data.pickupPoint.trim().length < 3) {
    errors.pickupPoint = 'Vui lòng nhập điểm nhận hàng cụ thể';
  }

  if (!data.dropoffPoint || data.dropoffPoint.trim().length < 3) {
    errors.dropoffPoint = 'Vui lòng nhập điểm giao hàng cụ thể';
  }

  if (!data.timeSlot) {
    errors.timeSlot = 'Vui lòng chọn khung giờ giao nhận mong muốn';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateBookingReference(prefix: string = 'HUBI'): string {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const timestamp = Date.now().toString().slice(-4);
  return `${prefix}-${timestamp}-${randomSuffix}`;
}

export function calculateDeliveryEconomics(orderCount: number = 1): {
  singleRate: number;
  hubiRate: number;
  savingsPercent: number;
  savedAmount: number;
} {
  const singleRate = 35000 * orderCount;
  const hubiRate = 14000 * orderCount;
  const savedAmount = singleRate - hubiRate;
  const savingsPercent = Math.round((savedAmount / singleRate) * 100);

  return {
    singleRate,
    hubiRate,
    savingsPercent,
    savedAmount,
  };
}

export function validateContactForm(name: string, email: string, message: string): ValidationResult {
  const errors: Record<string, string> = {};

  if (!name || name.trim().length < 2) {
    errors.name = 'Vui lòng nhập họ và tên của bạn';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.email = 'Vui lòng nhập địa chỉ email hợp lệ';
  }

  if (!message || message.trim().length < 5) {
    errors.message = 'Nội dung liên hệ cần ít nhất 5 ký tự';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
