import shield from "@/assets/shield-front-gradient.png";
import wallet from "@/assets/wallet-front-gradient.png";
import flash from "@/assets/flash-front-gradient.png";
import { TablePart, TableTitle } from "@/components/table-part";

export default function AboutSection() {
  return (
    <section className="my-8">
      <table
        id="about"
        className="hidden md:table bg-muted rounded-[3rem] border-spacing-0 w-full h-96 my-6"
      >
        <thead className="h-[40%]">
          <tr>
            <TableTitle delay={0.3}>security</TableTitle>
            <TableTitle delay={1.3}>price</TableTitle>
            <TableTitle delay={2.3}>speed</TableTitle>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-t-4 border-background w-1/3 p-6">
              <TablePart imageSrc={shield} imageTitle="shield" delay={0.3}>
                <p className="text-muted-foreground leading-8">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Assumenda consectetur deserunt, fuga id ipsam molestiae
                </p>
              </TablePart>
            </td>
            <td className="border-4 border-b-0 border-background w-1/3 p-6">
              <TablePart imageSrc={wallet} imageTitle="wallet" delay={1.3}>
                <p className="text-muted-foreground leading-8">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Assumenda consectetur deserunt, fuga id ipsam molestiae
                </p>
              </TablePart>
            </td>
            <td className="border-t-4 border-background w-1/3 p-6">
              <TablePart imageSrc={flash} imageTitle="flash" delay={2.3}>
                <p className="text-muted-foreground leading-8">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Assumenda consectetur deserunt, fuga id ipsam molestiae
                </p>
              </TablePart>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
