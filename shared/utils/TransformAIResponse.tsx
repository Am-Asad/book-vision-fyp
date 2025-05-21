import DOMPurify from "dompurify";

export const extractUserPrompt = (text: string): string => {
  const match = text.match(/question:\s*([\s\S]*)/i);
  return match ? match[1].trim() : text.trim();
};

export const transformAIResponse = (text: string): string => {
  const safeHTML = DOMPurify.sanitize(text || "");
  return safeHTML;
};
