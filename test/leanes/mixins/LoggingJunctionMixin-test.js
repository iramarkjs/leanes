const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const LeanES = require("../../../src/leanes/index.js").default;
const {
  initialize, module:moduleD, nameBy, resolver, meta, attribute, mixin, constant
} = LeanES.NS;

describe('LoggingJunctionMixin', () => {
  describe('.new', () => {
    it('should create new JunctionMediator instance with LoggingJunctionMixin', () => {
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @mixin(LeanES.NS.LoggingJunctionMixin)
      @moduleD(Test)
      class TestJunctionMediator extends LeanES.NS.Pipes.NS.JunctionMediator {
        @nameBy static  __filename = 'TestJunctionMediator';
        @meta static object = {};
      }
      const mediator = TestJunctionMediator.new('TEST_MEDIATOR', LeanES.NS.Pipes.NS.Junction.new());
      assert.instanceOf(mediator, LeanES.NS.Pipes.NS.JunctionMediator);
      assert.instanceOf(mediator._junction, LeanES.NS.Pipes.NS.Junction);
    });
  });
  describe('listNotificationInterests', () => {
    it('should get list of mediator notification interesets', () => {
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @mixin(LeanES.NS.LoggingJunctionMixin)
      @moduleD(Test)
      class TestJunctionMediator extends LeanES.NS.Pipes.NS.JunctionMediator {
        @nameBy static  __filename = 'TestJunctionMediator';
        @meta static object = {};
      }
      const mediator = TestJunctionMediator.new('TEST_MEDIATOR', LeanES.NS.Pipes.NS.Junction.new());
      assert.deepEqual(mediator.listNotificationInterests(), [
        LeanES.NS.Pipes.NS.JunctionMediator.ACCEPT_INPUT_PIPE,
        LeanES.NS.Pipes.NS.JunctionMediator.ACCEPT_OUTPUT_PIPE,
        LeanES.NS.Pipes.NS.JunctionMediator.REMOVE_PIPE,
        LeanES.NS.Pipes.NS.LogMessage.SEND_TO_LOG,
        LeanES.NS.Pipes.NS.LogFilterMessage.SET_LOG_LEVEL
      ]);
    });
  });
  describe('handleNotification', () => {
    it('should handle send-to-log notification (debug)', () => {
      const KEY = 'TEST_LOGGING_JUNCTION_MIXIN_001';
      const TEST_BODY = 'TEST_BODY';
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @mixin(LeanES.NS.LoggingJunctionMixin)
      @moduleD(Test)
      class TestJunctionMediator extends LeanES.NS.Pipes.NS.JunctionMediator {
        @nameBy static  __filename = 'TestJunctionMediator';
        @meta static object = {};
      }
      const junction = LeanES.NS.Pipes.NS.Junction.new();
      sinon.spy(junction, 'sendMessage');
      const mediator = TestJunctionMediator.new('TEST_MEDIATOR', junction);
      mediator.initializeNotifier(KEY);
      const notification = LeanES.NS.Notification.new(
        LeanES.NS.Pipes.NS.LogMessage.SEND_TO_LOG,
        TEST_BODY,
        LeanES.NS.Pipes.NS.LogMessage.LEVELS[LeanES.NS.Pipes.NS.LogMessage.DEBUG]
      );
      mediator.handleNotification(notification);
      const [ vsOutputPipeName, voMessage ] = junction.sendMessage.args[0];
      assert.equal(vsOutputPipeName, LeanES.NS.Pipes.NS.PipeAwareModule.STDLOG);
      assert.propertyVal(voMessage, 'logLevel', LeanES.NS.Pipes.NS.LogMessage.DEBUG);
      assert.propertyVal(voMessage, 'sender', KEY);
      assert.propertyVal(voMessage, 'message', 'TEST_BODY');
    });
    it('should handle send-to-log notification (error)', () => {
      const KEY = 'TEST_LOGGING_JUNCTION_MIXIN_001';
      const TEST_BODY = 'TEST_BODY';
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @mixin(LeanES.NS.LoggingJunctionMixin)
      @moduleD(Test)
      class TestJunctionMediator extends LeanES.NS.Pipes.NS.JunctionMediator {
        @nameBy static  __filename = 'TestJunctionMediator';
        @meta static object = {};
      }
      const junction = LeanES.NS.Pipes.NS.Junction.new();
      sinon.spy(junction, 'sendMessage');
      const mediator = TestJunctionMediator.new('TEST_MEDIATOR', junction);
      mediator.initializeNotifier(KEY);
      const notification = LeanES.NS.Notification.new(
        LeanES.NS.Pipes.NS.LogMessage.SEND_TO_LOG,
        TEST_BODY,
        LeanES.NS.Pipes.NS.LogMessage.LEVELS[LeanES.NS.Pipes.NS.LogMessage.ERROR]
      );
      mediator.handleNotification(notification);
      const [ vsOutputPipeName, voMessage ] = junction.sendMessage.args[0];
      assert.equal(vsOutputPipeName, LeanES.NS.Pipes.NS.PipeAwareModule.STDLOG);
      assert.propertyVal(voMessage, 'logLevel', LeanES.NS.Pipes.NS.LogMessage.ERROR);
      assert.propertyVal(voMessage, 'sender', KEY);
      assert.propertyVal(voMessage, 'message', 'TEST_BODY');
    });
    it('should handle send-to-log notification (fatal)', () => {
      const KEY = 'TEST_LOGGING_JUNCTION_MIXIN_001';
      const TEST_BODY = 'TEST_BODY';
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @mixin(LeanES.NS.LoggingJunctionMixin)
      @moduleD(Test)
      class TestJunctionMediator extends LeanES.NS.Pipes.NS.JunctionMediator {
        @nameBy static  __filename = 'TestJunctionMediator';
        @meta static object = {};
      }
      const junction = LeanES.NS.Pipes.NS.Junction.new();
      sinon.spy(junction, 'sendMessage');
      const mediator = TestJunctionMediator.new('TEST_MEDIATOR', junction);
      mediator.initializeNotifier(KEY);
      const notification = LeanES.NS.Notification.new(
        LeanES.NS.Pipes.NS.LogMessage.SEND_TO_LOG,
        TEST_BODY,
        LeanES.NS.Pipes.NS.LogMessage.LEVELS[LeanES.NS.Pipes.NS.LogMessage.FATAL]);
      mediator.handleNotification(notification);
      const [ vsOutputPipeName, voMessage ] = junction.sendMessage.args[0];
      assert.equal(vsOutputPipeName, LeanES.NS.Pipes.NS.PipeAwareModule.STDLOG);
      assert.propertyVal(voMessage, 'logLevel', LeanES.NS.Pipes.NS.LogMessage.FATAL);
      assert.propertyVal(voMessage, 'sender', KEY);
      assert.propertyVal(voMessage, 'message', 'TEST_BODY');
    });
    it('should handle send-to-log notification (warn)', () => {
      const KEY = 'TEST_LOGGING_JUNCTION_MIXIN_001';
      const TEST_BODY = 'TEST_BODY';
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @mixin(LeanES.NS.LoggingJunctionMixin)
      @moduleD(Test)
      class TestJunctionMediator extends LeanES.NS.Pipes.NS.JunctionMediator {
        @nameBy static  __filename = 'TestJunctionMediator';
        @meta static object = {};
      }
      const junction = LeanES.NS.Pipes.NS.Junction.new();
      sinon.spy(junction, 'sendMessage');
      const mediator = TestJunctionMediator.new('TEST_MEDIATOR', junction);
      mediator.initializeNotifier(KEY);
      const notification = LeanES.NS.Notification.new(LeanES.NS.Pipes.NS.LogMessage.SEND_TO_LOG, TEST_BODY, LeanES.NS.Pipes.NS.LogMessage.LEVELS[LeanES.NS.Pipes.NS.LogMessage.WARN]);
      mediator.handleNotification(notification);
      const [ vsOutputPipeName, voMessage ] = junction.sendMessage.args[0];
      assert.equal(vsOutputPipeName, LeanES.NS.Pipes.NS.PipeAwareModule.STDLOG);
      assert.propertyVal(voMessage, 'logLevel', LeanES.NS.Pipes.NS.LogMessage.WARN);
      assert.propertyVal(voMessage, 'sender', KEY);
      assert.propertyVal(voMessage, 'message', 'TEST_BODY');
    });
    it('should handle set-to-log notification', () => {
      const KEY = 'TEST_LOGGING_JUNCTION_MIXIN_002';
      const TEST_LEVEL = LeanES.NS.Pipes.NS.LogMessage.NONE;
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @mixin(LeanES.NS.LoggingJunctionMixin)
      @moduleD(Test)
      class TestJunctionMediator extends LeanES.NS.Pipes.NS.JunctionMediator {
        @nameBy static  __filename = 'TestJunctionMediator';
        @meta static object = {};
      }
      const junction = LeanES.NS.Pipes.NS.Junction.new();
      sinon.spy(junction, 'sendMessage');
      const mediator = TestJunctionMediator.new('TEST_MEDIATOR', junction);
      mediator.initializeNotifier(KEY);
      const notification = LeanES.NS.Notification.new(LeanES.NS.Pipes.NS.LogFilterMessage.SET_LOG_LEVEL, TEST_LEVEL);
      mediator.handleNotification(notification);
      let [vsOutputPipeName, voMessage] = junction.sendMessage.args[0];
      assert.equal(vsOutputPipeName, LeanES.NS.Pipes.NS.PipeAwareModule.STDLOG);
      assert.equal(voMessage.getType(), LeanES.NS.Pipes.NS.FilterControlMessage.SET_PARAMS);
      assert.equal(voMessage.logLevel, TEST_LEVEL);
      [vsOutputPipeName, voMessage] = junction.sendMessage.args[1];
      assert.equal(vsOutputPipeName, LeanES.NS.Pipes.NS.PipeAwareModule.STDLOG);
      assert.equal(voMessage.logLevel, LeanES.NS.Pipes.NS.LogMessage.CHANGE);
      assert.equal(voMessage.sender, KEY);
      assert.isDefined(voMessage.time);
      assert.equal(voMessage.message, `Changed Log Level to: ${LeanES.NS.Pipes.NS.LogMessage.LEVELS[TEST_LEVEL]}`);
    });
  });
});