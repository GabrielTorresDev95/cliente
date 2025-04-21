declare module '@mercadopago/sdk-js' {
  interface MercadoPago {
    new (publicKey: string, options?: { locale: string }): MercadoPago;
    checkout(params: {
      preference: { id: string };
      render: {
        container: string;
        label: string;
        type?: 'wallet' | 'modal';
      };
    }): void;
  }
  
  const MercadoPago: MercadoPago;
  export = MercadoPago;
}