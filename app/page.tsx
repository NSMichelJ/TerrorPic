import Image from "next/image";
import Link from "next/link";
import { Camera, Ghost, Share2, Sliders, Sparkles, Wand2 } from "lucide-react";

import SetionContainer from "@/app/components/SectionContainer";
import Step from "@/components/Step";

export default function Home() {
  return (
    <div className="bg-gradient bg-gray-800 min-h-screen text-gray-200 overflow-y-auto">
      <header className="bg-transparent w-full z-10">
        <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <Ghost className="w-8 h-8 mr-2" />
            <span className="font-bold text-2xl">TerrorPic</span>
          </div>
          <Link
            href="/create"
            className="inline-flex bg-medium-purple-700 hover:bg-medium-purple-800 text-gray-200 font-bold rounded-lg text-sm px-5 py-2.5"
          >
            Try Now
          </Link>
        </nav>
      </header>

      <main>
        <SetionContainer>
          <div className=" flex flex-col items-center justify-center h-80">
            <h1 className="text-4xl md:text-6xl font-bold mb-3 leading-normal">
              AI Terror Photo Creator
            </h1>
            <p className="text-lg md:text-xl mb-8 mx-auto max-w-2xl">
              Unleash the horror, transform your photos into spine-chilling
              masterpieces with our AI-powered photo editor
            </p>
            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-2 bg-medium-purple-700 hover:bg-medium-purple-800 text-gray-200 font-bold rounded-lg text-lg px-5 py-2.5 mb-2 transition duration-300 transform hover:scale-105"
            >
              Edit and Frighten <Sparkles />
            </Link>
          </div>
        </SetionContainer>

        <SetionContainer className="bg-gray-900/20 backdrop-blur-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-normal">
            Create your horror photo in a few simple steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Step
              label="1. Select the image"
              description="Choose your favorite photo from your device."
              icon={<Camera className="w-8 h-8 text-blue-300" />}
              bgColor="bg-blue-900"
              textColor="text-blue-300"
            />

            <Step
              label="2. Apply horror effects"
              description="Transform your photo with our range of spooky options."
              icon={<Wand2 className="w-8 h-8 text-purple-300" />}
              bgColor="bg-purple-900"
              textColor="text-purple-300"
            />

            <Step
              label="3. Download and share"
              description="Save your spooky creation and share it with friends."
              icon={<Share2 className="w-8 h-8 " />}
              bgColor="bg-green-900"
              textColor="text-green-300"
            />

            <Step
              label="4. Adjust to your liking (Optional)"
              description="Refine your creation by adjusting saturation, brightness and contrast."
              icon={<Sliders className="w-8 h-8 text-yellow-300-300" />}
              bgColor="bg-yellow-700"
              textColor="text-yellow-200"
            />
          </div>
        </SetionContainer>

        <section className="py-20 text-center bg-gray-900/20 backdrop-blur-lg">
          <div className="container mx-auto p-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-normal">
              Gallery of Horrors
            </h2>

            <div className="max-w-3xl grid gap-4 mx-auto">
              <div>
                <Image
                  className="h-full w-full rounded-lg object-cover"
                  alt="Example"
                  src="/img/gallery/sample-4.jpg"
                  width={800}
                  height={500}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Image
                    className="h-full w-full rounded-lg object-cover"
                    src="/img/gallery/sample-2.jpg"
                    alt=""
                    width={800}
                    height={500}
                  />
                </div>

                <div>
                  <Image
                    className="h-full w-full rounded-lg object-cover"
                    src="/img/gallery/sample-3.jpg"
                    alt=""
                    width={800}
                    height={500}
                  />
                </div>
                <div>
                  <Image
                    className="h-full w-full rounded-lg object-cover"
                    src="/img/gallery/sample-1.jpg"
                    alt=""
                    width={800}
                    height={500}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Image
                    className="h-full w-full rounded-lg object-cover"
                    alt="Example"
                    src="/img/gallery/sample-5.jpg"
                    width={800}
                    height={500}
                  />
                </div>
                <div>
                  <Image
                    className="h-full w-full rounded-lg object-cover"
                    alt="Example"
                    src="/img/gallery/sample-6.jpg"
                    width={800}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <SetionContainer>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-normal">
            How Does it Work?
          </h2>
          <p className="max-w-2xl text-lg font-normal mx-auto">
            This photo editor harnesses the cutting-edge technology of
            Cloudinary&apos;s AI to transform your images into spine-chilling
            masterpieces. Experience the future of horror editing with AI-driven
            precision and creativity.
          </p>
          <Link href="https://cloudinary.com/" target="_blank">
            <Image
              width={300}
              height={210}
              src="/img/cloudinary_stacked_logo_white.png"
              alt="cloudinary stacked logo white"
              className="w-44 mx-auto my-6 transition duration-300 transform hover:scale-105"
            />
          </Link>
        </SetionContainer>
      </main>

      <footer className="bg-gray-900/50 backdrop-blur-lg py-10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col justify-center items-center mb-4">
            <Ghost className="size-20" />
            <span className="font-bold text-3xl">TerrorPic</span>
          </div>
          <p className="mb-4 text-md">
            &copy; 2024 TerrorPic. Create by{" "}
            <Link
              href="https://nsmichelj.vercel.app/"
              target="_blank"
              className="underline"
            >
              nsmichelj
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
