import { Teko } from "next/font/google";
import Link from "next/link";
import { Session } from "next-auth";
import FooterContainer from "@/components/footer-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const teko = Teko({ weight: ["500"], subsets: ["latin"] });

type FooterProps = {
  session: Session | null;
};

export default function Footer({ session }: FooterProps) {
  return (
    <>
      <div className="border-t-2 " />
      <FooterContainer>
        <div className="my-3">
          <p className="text-2xl font-bol text-center mb-2">Newsletter</p>
          <div className="flex justify-center gap-2">
            <Input
              type="text"
              placeholder="youremail@mail.com"
              className="w-44"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
        <div className="flex justify-center gap-3 mb-14 md:gap-5">
          <div>
            <h2 className={`${teko.className} uppercase text-xl`}>
              confidentialité
            </h2>
            <ul>
              <li>
                <Link
                  href="/cgu"
                  className="transition-all hover:text-[#55d8f9]"
                >
                  CGU
                </Link>
              </li>
              <li>
                <Link
                  href="/cgv"
                  className="transition-all hover:text-[#55d8f9]"
                >
                  CGV
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className={`${teko.className} uppercase text-xl`}>boutique</h2>
            <ul>
              <li>
                <Link
                  href="/shop"
                  className="transition-all hover:text-[#55d8f9]"
                >
                  Catalogue
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="transition-all hover:text-[#55d8f9]"
                >
                  Panier
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className={`${teko.className} uppercase text-xl`}>compte</h2>
            <ul>
              <li>
                {session ? (
                  <Link
                    href="/me"
                    className="transition-all hover:text-[#55d8f9]"
                  >
                    Mon compte
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="transition-all hover:text-[#55d8f9]"
                  >
                    Se connecter
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </FooterContainer>
    </>
  );
}
