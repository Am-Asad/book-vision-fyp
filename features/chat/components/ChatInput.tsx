"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, PaperclipIcon, Send } from "lucide-react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record";
import { toast } from "react-hot-toast";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@/components/ui/tooltip";
import BookTutorModels from "./BookTutorModels";

type ChatInputFromVoProps = {
  handleSendMessage: (chatInput: string) => void;
  isPending: boolean;
};

export const ChatInput = ({
  handleSendMessage,
  isPending,
}: ChatInputFromVoProps) => {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [supportedMimeType, setSupportedMimeType] = useState<string | null>(
    null
  );

  const recognitionRef = useRef<any>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const recordPluginRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check for supported MIME types
  useEffect(() => {
    const mimeTypes = [
      "audio/webm",
      "audio/mp4",
      "audio/ogg",
      "audio/wav",
      "audio/webm;codecs=opus",
      "audio/webm;codecs=pcm",
      "audio/webm;codecs=vorbis",
    ];

    const supported = mimeTypes.find((type) => {
      try {
        return MediaRecorder.isTypeSupported(type);
      } catch (e) {
        return false;
      }
    });

    if (supported) {
      console.log(`Using supported MIME type: ${supported}`);
      setSupportedMimeType(supported);
    } else {
      console.error("No supported MIME types found for MediaRecorder");
      setSupportedMimeType("audio/webm");
    }
  }, []);

  // Initialize speech recognition and wavesurfer
  useEffect(() => {
    // Check if SpeechRecognition is supported
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    // Initialize speech recognition
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event: any) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const transcriptText = result[0].transcript;

      if (result.isFinal) {
        setInput((prev) => prev + " " + transcriptText);
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      toast.error("Speech recognition error: " + event.error);
      setIsRecording(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setIsRecording(false);
      }
      if (wavesurferRef.current) {
        setIsRecording(false);
        wavesurferRef.current.destroy();
      }
    };
  }, []);

  // Initialize wavesurfer when recording starts
  useEffect(() => {
    if (isRecording && waveformRef.current) {
      // Clean up any existing instance first
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
      // Create wavesurfer instance
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#10B981",
        progressColor: "#059669",
        cursorColor: "transparent",
        barWidth: 2,
        barGap: 1,
        height: 40,
        normalize: true,
        backend: "WebAudio",
      });

      // Initialize Record plugin
      try {
        recordPluginRef.current = wavesurferRef.current.registerPlugin(
          RecordPlugin.create({
            renderRecordedAudio: false,
          })
        );

        // Start recording for visualization
        if (recordPluginRef.current && supportedMimeType) {
          recordPluginRef.current
            .startRecording({
              mimeType: supportedMimeType,
              audio: {
                channelCount: 1,
                sampleRate: 44100,
              },
            })
            .catch((error: any) => {
              console.error("Error starting visualization recording:", error);
            });
        }
      } catch (error) {
        console.error("Error initializing record plugin:", error);
      }
    }

    return () => {
      if (!isRecording && wavesurferRef.current) {
        if (recordPluginRef.current) {
          try {
            recordPluginRef.current.stopRecording();
          } catch (error) {
            console.error("Error stopping recording:", error);
          }
        }
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
        setIsRecording(false);
      }
    };
  }, [isRecording, supportedMimeType]);

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      recognitionRef.current?.start();
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      toast.error("Speech recognition error: " + error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognitionRef.current?.stop();

    if (recordPluginRef.current) {
      try {
        recordPluginRef.current.stopRecording();
      } catch (error) {
        console.error("Error stopping recording:", error);
      }
      recordPluginRef.current = null;
    }

    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
      wavesurferRef.current = null;
    }
  };

  if (!isSupported) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg">
        Speech recognition is not supported in your browser. Please try Chrome,
        Edge, or Safari.
      </div>
    );
  }

  return (
    <div className="relative rounded-lg border bg-background shadow-sm w-full max-w-4xl mx-auto">
      <div className="flex gap-2 relative">
        {isRecording ? (
          <div
            ref={waveformRef}
            className="flex-1 p-2 min-h-[120px] border bg-muted rounded-md"
          />
        ) : (
          <Textarea
            ref={textareaRef}
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2"
          />
        )}

        <div className="absolute right-0 bottom-0 flex justify-between items-center gap-2 p-2 w-full">
          <div className="flex gap-2 items-center">
            <TooltipProvider>
              <div className="flex gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <PaperclipIcon className="h-4 w-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Attach file</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>

            {/* Book Tutor Models */}
            <BookTutorModels />
          </div>
          <div className="self-end flex items-center gap-2">
            <Button
              type="button"
              onClick={toggleRecording}
              variant={isRecording ? "destructive" : "ghost"}
              size="icon"
              className="rounded-full h-8 w-8"
              disabled={isPending}
            >
              {isRecording ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            <Button
              onClick={() => {
                if (input.trim()) {
                  handleSendMessage(input);
                  setInput("");
                } else {
                  toast.error("Please enter a message");
                }
              }}
              disabled={!input.trim() || isPending}
              size="icon"
              className="rounded-full h-8 w-8"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
