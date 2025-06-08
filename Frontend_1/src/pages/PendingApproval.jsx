import React from 'react';

export default function PendingApproval() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-6">
      <h2 className="text-3xl font-semibold mb-4 text-yellow-700">
        Registration Pending Approval
      </h2>
      <p className="text-yellow-800 max-w-md text-center">
        Your account registration request is still pending admin approval.
        Please wait for confirmation. You will receive an email notification
        once your request is approved.
      </p>
    </div>
  );
}
