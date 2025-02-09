/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace PetTaming {
  export type ReadableTamingAttemptStruct = {
    userId: BigNumberish;
    targetPetId: BigNumberish;
    successRate: BigNumberish;
    nftList: BigNumberish[];
    isSuccessful: boolean;
    timestamp: BigNumberish;
  };

  export type ReadableTamingAttemptStructOutput = [
    userId: bigint,
    targetPetId: bigint,
    successRate: bigint,
    nftList: bigint[],
    isSuccessful: boolean,
    timestamp: bigint
  ] & {
    userId: bigint;
    targetPetId: bigint;
    successRate: bigint;
    nftList: bigint[];
    isSuccessful: boolean;
    timestamp: bigint;
  };
}

export interface PetTamingInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "getLatestAttempt"
      | "getUserAttempts"
      | "recordTamingAttempt"
      | "userAttempts"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "TamingAttemptRecorded"): EventFragment;

  encodeFunctionData(
    functionFragment: "getLatestAttempt",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserAttempts",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "recordTamingAttempt",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish[], boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "userAttempts",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getLatestAttempt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserAttempts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recordTamingAttempt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userAttempts",
    data: BytesLike
  ): Result;
}

export namespace TamingAttemptRecordedEvent {
  export type InputTuple = [
    userId: BigNumberish,
    targetPetId: BigNumberish,
    successRate: BigNumberish,
    isSuccessful: boolean,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    userId: bigint,
    targetPetId: bigint,
    successRate: bigint,
    isSuccessful: boolean,
    timestamp: bigint
  ];
  export interface OutputObject {
    userId: bigint;
    targetPetId: bigint;
    successRate: bigint;
    isSuccessful: boolean;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface PetTaming extends BaseContract {
  connect(runner?: ContractRunner | null): PetTaming;
  waitForDeployment(): Promise<this>;

  interface: PetTamingInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  getLatestAttempt: TypedContractMethod<
    [_userId: BigNumberish],
    [PetTaming.ReadableTamingAttemptStructOutput],
    "view"
  >;

  getUserAttempts: TypedContractMethod<
    [_userId: BigNumberish],
    [PetTaming.ReadableTamingAttemptStructOutput[]],
    "view"
  >;

  recordTamingAttempt: TypedContractMethod<
    [
      _userId: BigNumberish,
      _targetPetId: BigNumberish,
      _successRate: BigNumberish,
      _usedNftIds: BigNumberish[],
      _isSuccessful: boolean
    ],
    [void],
    "nonpayable"
  >;

  userAttempts: TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [
      [bigint, bigint, bigint, boolean, bigint] & {
        userId: bigint;
        targetPetId: bigint;
        successRate: bigint;
        isSuccessful: boolean;
        timestamp: bigint;
      }
    ],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getLatestAttempt"
  ): TypedContractMethod<
    [_userId: BigNumberish],
    [PetTaming.ReadableTamingAttemptStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getUserAttempts"
  ): TypedContractMethod<
    [_userId: BigNumberish],
    [PetTaming.ReadableTamingAttemptStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "recordTamingAttempt"
  ): TypedContractMethod<
    [
      _userId: BigNumberish,
      _targetPetId: BigNumberish,
      _successRate: BigNumberish,
      _usedNftIds: BigNumberish[],
      _isSuccessful: boolean
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "userAttempts"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [
      [bigint, bigint, bigint, boolean, bigint] & {
        userId: bigint;
        targetPetId: bigint;
        successRate: bigint;
        isSuccessful: boolean;
        timestamp: bigint;
      }
    ],
    "view"
  >;

  getEvent(
    key: "TamingAttemptRecorded"
  ): TypedContractEvent<
    TamingAttemptRecordedEvent.InputTuple,
    TamingAttemptRecordedEvent.OutputTuple,
    TamingAttemptRecordedEvent.OutputObject
  >;

  filters: {
    "TamingAttemptRecorded(uint256,uint256,uint256,bool,uint256)": TypedContractEvent<
      TamingAttemptRecordedEvent.InputTuple,
      TamingAttemptRecordedEvent.OutputTuple,
      TamingAttemptRecordedEvent.OutputObject
    >;
    TamingAttemptRecorded: TypedContractEvent<
      TamingAttemptRecordedEvent.InputTuple,
      TamingAttemptRecordedEvent.OutputTuple,
      TamingAttemptRecordedEvent.OutputObject
    >;
  };
}
