define([
	'backbone',
], function (Backbone) {
	return {
		model: Backbone.Model.extend({
			defaults: function () {
				return {
					type: "img",
					src: "",
				}
			}
		}),
		view: Backbone.View.extend({
			temp: _.template(`
				<img src="<%= src %>">
			`),
			events: {
				"click": "openEditor",
            },
            // 视图定义了一个initialize初始化函数， 首先创建视图时，它会立刻被调用
			initialize: function () {
// object.listenTo(other, event, callback) 
// 让 object 监听 另一个（other）对象上的一个特定事件。
//不使用other.on(event, callback, object)，
//而使用这种形式的优点是：listenTo允许 object来跟踪这个特定事件，并且以后可以一次性全部移除它们。
//callback总是在object上下文环境中被调用。
// view.listenTo(model, 'change', view.render);
				this.listenTo(this.model, "change", this.render)
                this.listenTo(this.model, "destroy", this.remove)
			},

			render: function () {
				this.$el.html(this.temp(this.model.toJSON()))
				this.$el.data("node-id", this.model.get("id"))
				return this
			},
			openEditor: function () {
				Backbone.trigger("openEditor", this.model, this.$el)
			},a}),
		editor: Backbone.View.extend({
			temp: _.template(`
				<div class="panel-component">
					<div class="c-div div_AXed7o">
						<a class="btn-default btn-action btn btnDelete" sizes="" type="button">
							删除
						</a>
					</div>
				</div>
				<div class="panel-component">
					<label class="">
						编辑
					</label>
					<div class="c-div div_AXed7o">
						<textarea id="textInputer" name="" rows="5"><%= src %></textarea>
						<a class="btn-default btn-action btn btnUpdate" sizes="" type="button">
							修改图片
						</a>
					</div>
				</div>
			`),
			events: {
				"click .btnUpdate": "modifyNode",
				"click .btnDelete": "deleteNode",
			},
			initialize: function () {
				this.listenTo(this.model, "destroy", this.remove)
			},
			render: function () {
				this.$el.html(this.temp(this.model.toJSON()))
				return this
			},
			modifyNode: function () {
				this.model.save({
					src: this.$("textarea").val()
				})
			},
			deleteNode: function () {
				this.model.destroy()
			},
		}),
	}

});