import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VerificationStep = ({ email, onComplete, onBack }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleCodeChange = (index, value) => {
    if (value?.length > 1) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setError('');

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !verificationCode?.[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setCountdown(60);
      setCanResend(false);
    }, 1500);
  };

  const handleVerify = () => {
    const code = verificationCode?.join('');
    if (code?.length !== 6) {
      setError('Please enter the complete verification code');
      return;
    }

    if (code === '123456') {
      onComplete();
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Mail" size={32} color="var(--color-primary)" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Verify Your Email</h2>
        <p className="text-sm text-muted-foreground">
          We've sent a verification code to<br />
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground block mb-3 text-center">
          Enter Verification Code
        </label>
        <div className="flex gap-2 justify-center">
          {verificationCode?.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e?.target?.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-heading font-semibold border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
          ))}
        </div>
        {error && (
          <div className="mt-3 p-3 bg-error/10 border border-error/20 rounded-md flex items-start gap-2">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
            <p className="text-sm text-error">{error}</p>
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Didn't receive the code?
        </p>
        {canResend ? (
          <Button
            variant="link"
            size="sm"
            onClick={handleResend}
            loading={isResending}
          >
            Resend Code
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            Resend available in <span className="font-medium text-foreground">{countdown}s</span>
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" size="lg" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button 
          variant="default" 
          size="lg" 
          onClick={handleVerify}
          className="flex-1"
          disabled={verificationCode?.join('')?.length !== 6}
        >
          Verify Email
        </Button>
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          For demo purposes, use code: <span className="font-mono font-medium text-foreground">123456</span>
        </p>
      </div>
    </div>
  );
};

export default VerificationStep;