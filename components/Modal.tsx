
import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onPrivacyClick?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, onPrivacyClick }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{name?: string; phone?: string}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Configuration from environment variables
  const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8474043982:AAEGkHEcw9UCgsiYcaid6m0oj_IoG2fTXaA';
  const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '430097532';

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName('');
      setPhone('');
      setErrors({});
      setIsSubmitted(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Helper to escape HTML special characters for Telegram HTML mode
  const escapeHtml = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  // Safe localStorage helper
  const safeGetLocalStorage = (key: string, defaultValue: string): string => {
    try {
      return localStorage.getItem(key) || defaultValue;
    } catch (e) {
      console.warn('LocalStorage access denied:', e);
      return defaultValue;
    }
  };

  const safeSetLocalStorage = (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('LocalStorage write denied:', e);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, ''); 
    
    if (val === '') {
      setPhone('');
      setErrors((prev) => ({ ...prev, phone: undefined }));
      return;
    }

    if (val[0] === '8') {
      val = '7' + val.substring(1);
    } else if (val[0] !== '7') {
      val = '7' + val;
    }

    val = val.substring(0, 11);

    let formatted = '+7';
    if (val.length > 1) {
      formatted += ' (' + val.substring(1, 4);
    }
    if (val.length >= 5) {
      formatted += ') ' + val.substring(4, 7);
    }
    if (val.length >= 8) {
      formatted += '-' + val.substring(7, 9);
    }
    if (val.length >= 10) {
      formatted += '-' + val.substring(9, 11);
    }

    setPhone(formatted);
    
    if (errors.phone) {
       setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const validate = () => {
    const newErrors: {name?: string; phone?: string} = {};
    if (!name.trim()) newErrors.name = 'Пожалуйста, введите ваше имя';
    
    const digits = phone.replace(/\D/g, '');
    
    if (!phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (digits.length !== 11) {
      newErrors.phone = 'Введите полный номер телефона';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      const localCount = parseInt(safeGetLocalStorage('si_submission_count', '0'), 10) + 1;
      safeSetLocalStorage('si_submission_count', localCount.toString());

      const leadId = `SI-${Math.floor(Date.now() / 1000)}`;
      
      const now = new Date();
      const dateTimeStr = now.toLocaleString('ru-RU', { 
        day: '2-digit', month: '2-digit', year: 'numeric', 
        hour: '2-digit', minute: '2-digit', second: '2-digit' 
      });

      const phoneDigits = phone.replace(/\D/g, '');

      const message = [
        `🚀 <b>НОВАЯ ЗАЯВКА #${leadId}</b>`,
        `⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯`,
        `👤 <b>Имя:</b> ${escapeHtml(name)}`,
        `📞 <b>Телефон:</b> <a href="tel:${phoneDigits}">${escapeHtml(phone)}</a>`,
        `🎯 <b>Цель:</b> ${escapeHtml(title)}`,
        `⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯`,
        `📊 <b>Статистика устройства:</b>`,
        `🔢 Заявка №${localCount} от этого клиента`,
        `⏰ <b>Время:</b> ${dateTimeStr}`,
        `⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯`,
        `#lead #southinvest #${leadId}`
      ].join('\n');
      
      try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML',
            disable_web_page_preview: true
          }),
        });

        if (response.ok) {
          setIsSubmitted(true);
        } else {
          const errorData = await response.json();
          console.error('Telegram API Error:', errorData);
          throw new Error(errorData.description || 'Ошибка при отправке');
        }
      } catch (error) {
        console.error('Submission Catch:', error);
        alert('Произошла ошибка при отправке данных. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop transition-opacity duration-300"
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        className="bg-brand-surface rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-[fadeIn_0.3s_ease-out] border border-white/5"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Закрыть"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          {!isSubmitted ? (
            <>
              <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
              <p className="text-slate-400 mb-6">Оставьте свои контакты, и наш менеджер свяжется с вами в ближайшее время.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Имя</label>
                  <input
                    type="text"
                    id="name"
                    disabled={isSubmitting}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if(errors.name) setErrors({...errors, name: undefined});
                    }}
                    className={`w-full px-4 py-3 rounded-lg border bg-brand-main text-white placeholder-slate-500 ${errors.name ? 'border-red-500' : 'border-white/10 focus:border-brand-blue'} focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-colors disabled:opacity-50`}
                    placeholder="Иван Иванов"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1"/>{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1">Телефон</label>
                  <input
                    type="tel"
                    id="phone"
                    disabled={isSubmitting}
                    value={phone}
                    onChange={handlePhoneInput}
                    maxLength={18}
                    className={`w-full px-4 py-3 rounded-lg border bg-brand-main text-white placeholder-slate-500 ${errors.phone ? 'border-red-500' : 'border-white/10 focus:border-brand-blue'} focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-colors disabled:opacity-50`}
                    placeholder="+7 (999) 000-00-00"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1"/>{errors.phone}</p>}
                </div>

                <Button type="submit" fullWidth size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    'Оставить заявку'
                  )}
                </Button>

                <p className="text-xs text-slate-500 text-center mt-4">
                  Нажимая кнопку, вы даете согласие на обработку <a href="#" onClick={(e) => { e.preventDefault(); if (onPrivacyClick) onPrivacyClick(); }} className="underline hover:text-brand-blue">персональных данных</a>.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Заявка принята!</h3>
              <p className="text-slate-400 mb-6">Ваши данные успешно отправлены. Наш менеджер свяжется с вами в течение 15 минут.</p>
              <Button onClick={onClose} variant="outline">Закрыть</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
