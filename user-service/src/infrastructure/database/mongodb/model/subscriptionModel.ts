import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
  userId: Schema.Types.ObjectId;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  plan?: string;
  status?: string;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  amount?: number;
  isExpired?: boolean;
  cancellationFeedback?:string;
}

const SubscriptionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  stripeSubscriptionId: { type: String, },
  stripeCustomerId: { type: String },
  plan: { type: String },
  status: { type: String, },
  currentPeriodStart: { type: Date, },
  currentPeriodEnd: { type: Date, },
  cancelAtPeriodEnd: { type: Boolean, default: false },
  amount: { type: Number, },
  isExpired: { type: Boolean, default: false },
  cancellationFeedback:{type:String,default:null}
}, {
  timestamps: true
});

export const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);