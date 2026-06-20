import { ArrowRight, Zap } from "lucide-react";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { getData } from "@/context/userContext";

const Hero = () => {
  const { user, authLoading } = getData();
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-0 h-auto bg-gray-100 overflow-hidden">
      <section className="w-full py-16 md:py-24 lg:py-32 xl:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col items-center space-y-4 text-center">

            {/* Welcome message */}
            {authLoading ? (
              <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg" />
            ) : (
              user && (
                <h1 className="font-bold text-xl md:text-2xl text-[#1a1a2e]">
                  Welcome back, {user.fullName || user.username} 👋
                </h1>
              )
            )}

            {/* Badge */}
            <Badge variant="secondary" className="mb-2 border border-black text-xs md:text-sm">
              <Zap className="w-3 h-3 mr-1" />
              New: AI-powered note organization
            </Badge>

            {/* Main heading */}
            <h1 className="text-orange-600 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Your thoughts, organized
              <br className="hidden sm:block" />
              and accessible
              <span className="text-gray-800"> everywhere</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto max-w-xl md:max-w-2xl text-muted-foreground text-base md:text-xl px-2">
              Capture ideas, organize thoughts, and collaborate seamlessly.
              The modern note-taking app that grows with you and keeps your
              ideas secure in the cloud.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
              <Button
                onClick={() => navigate("/notes")}
                size="lg"
                className="h-12 px-8 cursor-pointer bg-orange-600 hover:bg-orange-500 w-full sm:w-auto"
              >
                Start Taking Notes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 bg-white cursor-pointer w-full sm:w-auto"
                onClick={() => navigate("/watch-demo")}
              >
                Watch Demo
              </Button>
            </div>

            {/* Footer note */}
            <p className="text-xs md:text-sm text-muted-foreground">
              Free forever • No credit card required • 2 minutes setup
            </p>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;