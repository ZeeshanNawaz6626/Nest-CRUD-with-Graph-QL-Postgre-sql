import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class AddBookArgs {
  @Field()
  title:string;

  @Field((type)=>Int)
  price:number;
}
