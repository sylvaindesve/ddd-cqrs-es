/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * Utilitaires pour récupérer le nom de classe d'un objet.
 */
export class ClassUtil {
  public static nameOf(instanceOrConstructor: any): string {
    if (typeof instanceOrConstructor === "function") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return this.nameOfConstructor(instanceOrConstructor);
    }
    return this.nameOfInstance(instanceOrConstructor);
  }

  public static nameOfInstance(instance: any): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
    return this.nameOfConstructor(Object.getPrototypeOf(instance).constructor);
  }

  public static nameOfConstructor(
    constructor: new (...args: any[]) => any
  ): string {
    return constructor.name;
  }
}
