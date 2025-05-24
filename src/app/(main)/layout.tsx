
import MainProvider from "./MainProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

<MainProvider>
  {children}

</MainProvider>

    
       
  );
}
